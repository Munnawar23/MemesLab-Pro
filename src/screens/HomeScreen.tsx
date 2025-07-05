import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  Image,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import LottieView from "lottie-react-native";
// --- MODIFIED ---: We will use Expo's built-in tools
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useNetInfo } from "@react-native-community/netinfo";

import { getCarouselData } from "@constants/carousel";
import EnterUrlModal from "@components/modals/EnterUrlModal";
import ImportantMessageModal from "@components/modals/ImportantMessageModal";
import { downloadAndCacheImage } from "@services/imageCaching";
import { copyImageToAppDir } from "@utils/imageUtils";
import ConnectionBanner from "@components/common/ConnectionBanner";
import MemeCard from "@components/cards/TemplateCard";
import styles from "@styles/screenStyles/HomeScreen.styles";
import { allMemes } from "@constants/memes";

// Defines the navigation stack parameters for type-safe navigation.
type StackParamList = {
  Create: { imageUri: string };
  Templates: undefined;
};

// Defines the structure for a generic informational modal's state.
type InfoModalState = {
  visible: boolean;
  title: string;
  message: string;
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const netInfo = useNetInfo();
  const { width } = useWindowDimensions();

  // A reference to the carousel ScrollView for programmatic scrolling.
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadingUrl, setLoadingUrl] = useState(false);

  // Memoizes the featured templates to prevent re-computation on every render.
  const featuredTemplates = React.useMemo(() => {
    return allMemes.slice(0, 6);
  }, []);

  // State for managing the visibility and content of the URL input modal.
  const [urlModalVisible, setUrlModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [errorText, setErrorText] = useState("");

  // State for the generic informational modal.
  const [infoModal, setInfoModal] = useState<InfoModalState>({
    visible: false,
    title: "",
    message: "",
  });

  // Displays a modal informing the user that an action requires internet.
  const showOfflineWarning = () => {
    setInfoModal({
      visible: true,
      title: "Connection Error",
      message:
        "An internet connection is required for this action. Please check your connection and try again.",
    });
  };

  // Displays a modal with a general responsible-use message.
  const showImportantMessage = () => {
    setInfoModal({
      visible: true,
      title: "Important Message",
      message:
        "Please use this app responsibly. It is intended for fun, and you should not use anyone's photo without their consent.",
    });
  };

  // A higher-order function that wraps an action with a network connectivity check.
  const withNetworkCheck = (action: () => void) => {
    return () => {
      if (netInfo.isConnected) {
        action();
      } else {
        showOfflineWarning();
      }
    };
  };

  // Navigates to the meme creation screen with a specific image URI.
  const handleNavigateToCreate = (uri: string) => {
    navigation.navigate("Create", { imageUri: uri });
  };

  // Retrieves the data for the main feature carousel.
  const carouselData = getCarouselData(
    handleNavigateToCreate,
    withNetworkCheck(() => navigation.navigate("Templates")),
    showImportantMessage,
    withNetworkCheck
  );

  // An effect that automatically scrolls the carousel every 3 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (activeSlide + 1) % carouselData.length;
      const offsetX = nextSlide * width;
      scrollViewRef.current?.scrollTo({ x: offsetX, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, [activeSlide, width]);

  // Updates the active slide index based on the user's manual scroll position.
  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slide !== activeSlide) setActiveSlide(slide);
  };

  // --- MODIFIED ---: This is the new openGallery function using only Expo tools.
  const openGallery = async () => {
    // Step 1: Pick an image using expo-image-picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      quality: 1,
      // We set allowsEditing to true to get a simple cropping UI from the system
      allowsEditing: true,
      aspect: [1, 1], // Enforce a square aspect ratio for the crop
    });

    if (result.canceled) {
      return; // User cancelled the picker
    }

    // The result from allowsEditing:true is already a cropped, temporary image.
    // We just need to copy it to a permanent location.
    try {
      const permanentUri = await copyImageToAppDir(result.assets[0].uri);
      handleNavigateToCreate(permanentUri);
    } catch (error) {
      console.error("Could not process image: ", error);
      setInfoModal({
        visible: true,
        title: "Error",
        message: "Could not process the selected image.",
      });
    }
  };

  // Opens the URL input modal.
  const openUrlModal = () => {
    setImageUrl("");
    setErrorText("");
    setUrlModalVisible(true);
  };

  // Handles the submission of an image URL.
  const handleSubmitUrl = async () => {
    if (!imageUrl) {
      return setErrorText("URL cannot be empty.");
    }

    setLoadingUrl(true);
    setErrorText("");

    try {
      const cachedUri = await downloadAndCacheImage(imageUrl);
      if (cachedUri) {
        setUrlModalVisible(false);
        handleNavigateToCreate(cachedUri);
      } else {
        setErrorText("Failed to load image. Check the URL.");
      }
    } catch {
      setErrorText("Please enter a valid image URL.");
    } finally {
      setLoadingUrl(false);
    }
  };

  // Renders a single featured template card for the FlatList.
  const renderFeaturedTemplate = ({ item }: { item: any }) => (
    <MemeCard
      image={item.image}
      title={item.title}
      onPress={withNetworkCheck(() =>
        handleNavigateToCreate(Image.resolveAssetSource(item.image).uri)
      )}
    />
  );

  return (
    <View style={styles.container}>
      <ConnectionBanner />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ... (rest of your JSX is unchanged) ... */}

        <View style={styles.mainHeader}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{ width }}
          >
            {carouselData.map((item) => (
              <View key={item.id} style={[styles.carouselWrapper, { width }]}>
                <TouchableOpacity
                  style={[styles.carouselCard, { width: width - 40 }]}
                  onPress={item.onPress}
                  activeOpacity={0.8}
                >
                  <LottieView
                    source={item.animation}
                    autoPlay
                    loop
                    style={styles.lottieAnimation}
                  />
                  <Text style={styles.carouselCardText}>{item.text}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.paginationContainer}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  activeSlide === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.createSection}>
          <Text style={styles.primarySectionTitle}>🎨 Create Your Own</Text>
          <Text style={styles.sectionDescription}>
            Start from scratch with your own image
          </Text>

          <View style={styles.createOptionsGrid}>
            <TouchableOpacity
              style={styles.createOptionCard}
              onPress={withNetworkCheck(openGallery)}
            >
              <Text style={styles.createOptionEmoji}>📱</Text>
              <Text style={styles.createOptionText}>From Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createOptionCard}
              onPress={withNetworkCheck(openUrlModal)}
            >
              <Text style={styles.createOptionEmoji}>🔗</Text>
              <Text style={styles.createOptionText}>From URL</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.primarySectionTitle}>🔥 Featured Templates</Text>
          <Text style={styles.sectionDescription}>
            Popular meme templates to get you started
          </Text>

          <FlatList
            data={featuredTemplates}
            renderItem={renderFeaturedTemplate}
            keyExtractor={(_, index) => `featured-${index}`}
            numColumns={2}
            columnWrapperStyle={styles.flatListRow}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>🎭 MemesLab Pro</Text>
          <Text style={styles.footerText}>
            Create amazing memes and share them with the world!
          </Text>
          <Text style={styles.footerSubtext}>
            ©2025 MemesLab Pro • Version 1.0
          </Text>
        </View>
      </ScrollView>

      <EnterUrlModal
        visible={urlModalVisible}
        onClose={() => setUrlModalVisible(false)}
        imageUrl={imageUrl}
        onChangeUrl={setImageUrl}
        errorText={errorText}
        onSubmit={withNetworkCheck(handleSubmitUrl)}
        loading={loadingUrl}
      />

      <ImportantMessageModal
        visible={infoModal.visible}
        title={infoModal.title}
        message={infoModal.message}
        onClose={() => setInfoModal({ ...infoModal, visible: false })}
      />
    </View>
  );
};

export default HomeScreen;
