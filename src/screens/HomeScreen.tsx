import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNetInfo } from '@react-native-community/netinfo';

import EnterUrlModal from '@components/modals/EnterUrlModal';
import { downloadAndCacheImage } from '@services/imageCaching';
import { copyImageToAppDir } from '@utils/imageUtils';
import ConnectionBanner from '@components/common/ConnectionBanner';
import MemeCard from '@components/cards/TemplateCard';
import styles from '@styles/screenStyles/HomeScreen.styles';

import { indianMemes, topTemplates } from '@constants/memes';

type StackParamList = {
  Create: { imageUri: string };
  Templates: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const netInfo = useNetInfo();
  const { width } = useWindowDimensions();

  const scrollViewRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const featuredTemplates = React.useMemo(() => {
    const allMemes = [...indianMemes, ...topTemplates];
    return allMemes.slice(0, 6);
  }, []);

  const [urlModalVisible, setUrlModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [errorText, setErrorText] = useState('');

  // 🎲 pick random meme & navigate
  const handleRandomMeme = () => {
    const allMemes = [...indianMemes, ...topTemplates];
    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const randomMeme = allMemes[randomIndex];
    const randomUri = Image.resolveAssetSource(randomMeme.image).uri;
    handleNavigateToCreate(randomUri);
  };

  const carouselData = [
    {
      id: 1,
      text: 'Welcome to Meme Creator!',
      animation: require('@assets/animations/welcome.json'),
      onPress: handleRandomMeme, // 🎯 now runs random meme
    },
    {
      id: 2,
      text: 'Browse All Meme Templates',
      animation: require('@assets/animations/meme.json'),
      onPress: () => navigation.navigate('Templates'),
    },
    {
      id: 3,
      text: 'Tap here for a surprise message!',
      animation: require('@assets/animations/warning.json'),
      onPress: () =>
        Alert.alert(
          'Hey There!',
          'Thanks for checking out the app. Have a great day! 😄'
        ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (activeSlide + 1) % carouselData.length;
      const offsetX = nextSlide * width;
      scrollViewRef.current?.scrollTo({ x: offsetX, animated: true });
      setActiveSlide(nextSlide);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeSlide, width]);

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slide !== activeSlide) setActiveSlide(slide);
  };

  const showOfflineAlert = () => {
    Alert.alert(
      'No Internet',
      'An internet connection is required for this action.'
    );
  };

  const handleNavigateToCreate = (uri: string) => {
    if (!netInfo.isConnected) return showOfflineAlert();
    navigation.navigate('Create', { imageUri: uri });
  };

  const openGallery = async () => {
    if (!netInfo.isConnected) return showOfflineAlert();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });
    if (!result.canceled) {
      const permanentUri = await copyImageToAppDir(result.assets[0].uri);
      handleNavigateToCreate(permanentUri);
    }
  };

  const openUrlModal = () => {
    if (!netInfo.isConnected) return showOfflineAlert();
    setImageUrl('');
    setErrorText('');
    setUrlModalVisible(true);
  };

  const handleSubmitUrl = async () => {
    if (!imageUrl) return setErrorText('URL cannot be empty.');
    try {
      const cachedUri = await downloadAndCacheImage(imageUrl);
      if (cachedUri) {
        setUrlModalVisible(false);
        handleNavigateToCreate(cachedUri);
      } else {
        setErrorText('Failed to load image. Check the URL.');
      }
    } catch {
      setErrorText('Please enter a valid image URL.');
    }
  };

  const renderFeaturedTemplate = ({ item, index }: { item: any; index: number }) => (
    <MemeCard
      image={item.image}
      title={item.title}
      onPress={() =>
        handleNavigateToCreate(Image.resolveAssetSource(item.image).uri)
      }
    />
  );

  return (
    <View style={styles.container}>
      <ConnectionBanner />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- HEADER CAROUSEL --- */}
        <View style={styles.mainHeader}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{ width }}
            contentContainerStyle={{ alignItems: 'center' }}
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

        {/* Upload options */}
        <View style={styles.createSection}>
          <Text style={styles.primarySectionTitle}>🎨 Create Your Own</Text>
          <Text style={styles.sectionDescription}>
            Start from scratch with your own image
          </Text>

          <View style={styles.createOptionsGrid}>
            <TouchableOpacity
              style={styles.createOptionCard}
              onPress={openGallery}
            >
              <Text style={styles.createOptionEmoji}>📱</Text>
              <Text style={styles.createOptionText}>From Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createOptionCard}
              onPress={openUrlModal}
            >
              <Text style={styles.createOptionEmoji}>🔗</Text>
              <Text style={styles.createOptionText}>From URL</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Templates */}
        <View style={styles.featuredSection}>
          <Text style={styles.primarySectionTitle}>🔥 Featured Templates</Text>
          <Text style={styles.sectionDescription}>
            Popular meme templates to get you started
          </Text>

          <FlatList
            data={featuredTemplates}
            renderItem={renderFeaturedTemplate}
            keyExtractor={(item, index) => `featured-${index}`}
            numColumns={2}
            columnWrapperStyle={styles.flatListRow}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>✨ Made with Love</Text>
          <Text style={styles.footerText}>
            Create amazing memes and share them with the world!
          </Text>
          <Text style={styles.footerSubtext}>
            © 2024 Meme Creator • Version 1.0
          </Text>
        </View>
      </ScrollView>

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
