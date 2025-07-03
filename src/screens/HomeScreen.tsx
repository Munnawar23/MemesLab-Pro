import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Expo image picker & manipulator
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

// NetInfo
import { useNetInfo } from "@react-native-community/netinfo";

// Modals
import EnterUrlModal from "@components/modals/EnterUrlModal";

// Services
import { downloadAndCacheImage } from "@services/imageCaching";

// Utils
import { copyImageToAppDir } from "@utils/imageUtils";

// Constants
import { indianMemes, topTemplates } from "@constants/memes";

// Components
import ConnectionBanner from "@components/common/ConnectionBanner";
import MemeCard from "@components/cards/TemplateCard";

// Styles
import styles from "@styles/screenStyles/HomeScreen.styles";

// Navigation type for screen transition
type StackParamList = {
  Create: { imageUri: string };
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const netInfo = useNetInfo();

  // Modal state
  const [urlModalVisible, setUrlModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [errorText, setErrorText] = useState("");

  // Show alert when offline
  const showOfflineAlert = () => {
    Alert.alert(
      "No Internet",
      "An internet connection is required to create a meme."
    );
  };

  // Navigate to Create screen
  const handleNavigateToCreate = (uri: string) => {
    if (!netInfo.isConnected) return showOfflineAlert();
    navigation.navigate("Create", { imageUri: uri });
  };

  // Select image from gallery
  const openGallery = async () => {
    if (!netInfo.isConnected) return showOfflineAlert();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"], // Shows both image/video
      quality: 1,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const permanentUri = await copyImageToAppDir(uri);
      handleNavigateToCreate(permanentUri);
    }
  };

  // Open modal for image URL input
  const openUrlModal = () => {
    if (!netInfo.isConnected) return showOfflineAlert();
    setImageUrl("");
    setErrorText("");
    setUrlModalVisible(true);
  };

  // Handle submission of image URL
  const handleSubmitUrl = async () => {
    if (!netInfo.isConnected) return showOfflineAlert();
    if (!imageUrl) return setErrorText("URL cannot be empty.");

    try {
      new URL(imageUrl);
    } catch {
      return setErrorText("Please enter a valid URL.");
    }

    try {
      const cachedUri = await downloadAndCacheImage(imageUrl);
      if (cachedUri) {
        setUrlModalVisible(false);
        handleNavigateToCreate(cachedUri);
      } else {
        setErrorText("Failed to load image. Please check the URL.");
      }
    } catch {
      setErrorText("Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Banner shows when offline */}
      <ConnectionBanner />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* App title */}
        <View style={styles.mainHeader}>
          <Text style={styles.mainTitle}>🎭 Meme Creator</Text>
          <Text style={styles.mainSubtitle}>
            Choose a template or create from scratch
          </Text>
        </View>

        {/* Upload options */}
        <View style={styles.createSection}>
          <Text style={styles.primarySectionTitle}>🎨 Create Your Meme</Text>
          <Text style={styles.sectionDescription}>
            Upload your own image or use a URL to get started
          </Text>

          <View style={styles.createOptionsGrid}>
            {/* Option 1: Gallery */}
            <TouchableOpacity
              style={styles.createOptionCard}
              onPress={openGallery}
            >
              <Text style={styles.createOptionEmoji}>📱</Text>
              <Text style={styles.createOptionText}>From Gallery</Text>
              <Text style={styles.createOptionSubtext}>
                Choose from your photos
              </Text>
            </TouchableOpacity>

            {/* Option 2: URL */}
            <TouchableOpacity
              style={styles.createOptionCard}
              onPress={openUrlModal}
            >
              <Text style={styles.createOptionEmoji}>🔗</Text>
              <Text style={styles.createOptionText}>From URL</Text>
              <Text style={styles.createOptionSubtext}>
                Enter image link
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Template list */}
        <View style={styles.templatesSection}>
          <Text style={styles.primarySectionTitle}>📋 Create from Templates</Text>

          {/* Indian memes */}
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Famous Indian Memes</Text>
            <View style={styles.cardsGrid}>
              {indianMemes.map((item, index) => (
                <MemeCard
                  key={`indian-${index}`}
                  image={item.image}
                  title={item.title}
                  onPress={() =>
                    handleNavigateToCreate(
                      Image.resolveAssetSource(item.image).uri
                    )
                  }
                />
              ))}
            </View>
          </View>

          {/* Top templates */}
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Top Meme Templates</Text>
            <View style={styles.cardsGrid}>
              {topTemplates.map((item, index) => (
                <MemeCard
                  key={`template-${index}`}
                  image={item.image}
                  title={item.title}
                  onPress={() =>
                    handleNavigateToCreate(
                      Image.resolveAssetSource(item.image).uri
                    )
                  }
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* URL Input Modal */}
      <EnterUrlModal
        visible={urlModalVisible}
        onClose={() => setUrlModalVisible(false)}
        imageUrl={imageUrl}
        onChangeUrl={setImageUrl}
        errorText={errorText}
        onSubmit={handleSubmitUrl}
      />
    </View>
  );
};

export default HomeScreen;
