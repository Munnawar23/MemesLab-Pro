import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
//ViewShot
import ViewShot from 'react-native-view-shot';
//Services
import { saveMeme } from '@services/memeStorage';
import Button from '@components/common/Button';
//Styles
import styles from '@styles/screenStyles/CreateScreen.styles';

// define type for navigation params
type RootStackParamList = {
  Create: { imageUri: string };
  Main: { screen: string };
};

type CreateScreenRouteProp = RouteProp<RootStackParamList, 'Create'>;
type CreateScreenNavigationProp = NavigationProp<RootStackParamList>;

const CreateScreen = () => {
  // access the passed-in image URI from navigation route
  const route = useRoute<CreateScreenRouteProp>();
  const navigation = useNavigation<CreateScreenNavigationProp>();
  const { imageUri } = route.params;

  // states for top text, bottom text, and save indicator
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // reference to the meme canvas (for capturing screenshot)
  const viewShotRef = useRef<ViewShot>(null);

  /**
   * Captures the meme canvas, saves it to AsyncStorage and navigates back
   */
  const handleSave = async () => {
    if (isSaving) return; // prevent double save
    setIsSaving(true);

    try {
      const viewShot = viewShotRef.current;

      // if capture is not available, throw error
      if (!viewShot || typeof viewShot.capture !== 'function') {
        throw new Error('Capture component is not available.');
      }

      // capture the current canvas
      const capturedUri = await viewShot.capture();

      // save captured meme to storage
      await saveMeme({ imageUri: capturedUri });

      // show success alert and navigate to MyMemes screen
      Alert.alert('✅ Success!', 'Your meme has been saved.', [
        { text: 'OK', onPress: () => navigation.navigate('Main', { screen: 'MyMemes' }) },
      ]);
    } catch (error) {
      console.error('Failed to save meme:', error);
      Alert.alert('❌ Error', 'Could not save the meme. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* 🎨 Meme canvas: combines image + text overlays */}
        <ViewShot
          ref={viewShotRef}
          style={styles.memeCanvas}
          options={{ format: 'jpg', quality: 0.9 }}
        >
          {/* Background image */}
          <Image source={{ uri: imageUri }} style={styles.imageBackground} />

          {/* Overlay texts: top and bottom */}
          <View style={styles.textOverlay}>
            <Text style={styles.memeText} numberOfLines={2}>
              {topText}
            </Text>
            <Text style={styles.memeText} numberOfLines={2}>
              {bottomText}
            </Text>
          </View>
        </ViewShot>

        {/* ✏️ Text inputs for top & bottom text */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Top Text"
            placeholderTextColor="#a3a3a3"
            value={topText}
            onChangeText={setTopText}
            maxLength={50}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Bottom Text"
            placeholderTextColor="#a3a3a3"
            value={bottomText}
            onChangeText={setBottomText}
            maxLength={50}
          />
        </View>

        {/* 💾 Save button or loading indicator */}
        <View style={styles.buttonContainer}>
          {isSaving ? (
            <ActivityIndicator size="large" color="#84cc16" />
          ) : (
            <Button label="Save Meme" onPress={handleSave} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;
