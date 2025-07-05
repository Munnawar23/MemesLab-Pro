// CreateScreen.js

import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Dimensions,
  Modal,
} from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import ViewShot from 'react-native-view-shot';
import LottieView from 'lottie-react-native';

import { saveMeme } from '@services/memeStorage';
import Button from '@components/common/Button';
import DraggableTextInput from '@components/common/DraggableTextInput';
import styles from '@styles/screenStyles/CreateScreen.styles';
import { themeColors } from '@styles/globalStyles/themeColors';

interface TextInputState {
  id: number;
  text: string;
  initialY: number;
}

// Defines the types for navigation and route parameters.
type RootStackParamList = { Create: { imageUri: string }; Main: { screen: string } };
type CreateScreenRouteProp = RouteProp<RootStackParamList, 'Create'>;
type CreateScreenNavigationProp = NavigationProp<RootStackParamList>;

// Predefined text color palette for the user to choose from.
const TEXT_COLORS = ['#FFFFFF', '#000000', '#FFD700', '#FF4500', '#32CD32', '#1E90FF', '#9400D3'];

const { width } = Dimensions.get('window');
const canvasWidth = width;
const canvasHeight = canvasWidth;

const CreateScreen = () => {
  const route = useRoute<CreateScreenRouteProp>();
  const navigation = useNavigation<CreateScreenNavigationProp>();
  const { imageUri } = route.params;

  const headerHeight = useHeaderHeight();

  // State for draggable text input overlays.
  const [textInputs, setTextInputs] = useState<TextInputState[]>([
    { id: Date.now(), text: '', initialY: 10 },
  ]);

  const [textColor, setTextColor] = useState('#FFFFFF');
  const [isSaving, setIsSaving] = useState(false);
  const [showLottieAnimation, setShowLottieAnimation] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  // Add a new draggable text input field to the canvas.
  const addTextInput = () => {
    const newTextInput: TextInputState = {
      id: Date.now(),
      text: '',
      initialY: canvasHeight / 2 - 40,
    };
    setTextInputs((currentInputs) => [...currentInputs, newTextInput]);
  };

  // Update the text content of a specific input field.
  const handleTextChange = (id: number, newText: string) => {
    setTextInputs((currentInputs) =>
      currentInputs.map((input) =>
        input.id === id ? { ...input, text: newText } : input
      )
    );
  };

  // Remove a text input field. (No restriction now.)
  const handleCloseText = (id: number) => {
    setTextInputs((currentInputs) => currentInputs.filter((input) => input.id !== id));
  };

  // Capture the meme canvas as an image, save it locally, and show success animation.
  const handleSave = async () => {
    if (!viewShotRef.current) return;
    setIsSaving(true);
    try {
      const uri = await viewShotRef.current?.capture?.();
      if (!uri) {
        setIsSaving(false);
        Alert.alert('Error', 'Could not capture the meme.');
        return;
      }
      await saveMeme({ imageUri: uri });
      setShowLottieAnimation(true); // Show success animation.
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong while saving the meme.');
    } finally {
      setIsSaving(false);
    }
  };

  // Navigate to "My Memes" screen after the success animation ends.
  const onLottieAnimationFinish = () => {
    setShowLottieAnimation(false);
    navigation.navigate('Main', { screen: 'My Memes' });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Show your Creativity</Text>

        {/* Canvas with image and draggable text inputs */}
        <ViewShot
          ref={viewShotRef}
          style={styles.canvasContainer}
          options={{ format: 'jpg', quality: 0.9 }}
        >
          <Image source={{ uri: imageUri }} style={styles.image} />
          {textInputs.map((input) => (
            <DraggableTextInput
              key={input.id}
              id={input.id}
              value={input.text}
              onChangeText={handleTextChange}
              onClose={handleCloseText}
              textColor={textColor}
              initialY={input.initialY}
              canvasWidth={canvasWidth}
              isSaving={isSaving}
            />
          ))}
        </ViewShot>

        {/* Color palette for text color selection */}
        <View style={styles.colorPaletteContainer}>
          <Text style={styles.paletteTitle}>Choose Text Color</Text>
          <View style={styles.colorPalette}>
            {TEXT_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorSwatch,
                  { backgroundColor: color },
                  textColor === color && styles.activeColorSwatch,
                ]}
                onPress={() => setTextColor(color)}
              />
            ))}
          </View>
        </View>

        {/* Add another text button */}
        <TouchableOpacity style={styles.addTextButton} onPress={addTextInput}>
          <Text style={styles.addTextButtonText}>+ Add Another Text</Text>
        </TouchableOpacity>

        {/* Save button */}
        <View style={styles.buttonContainer}>
          {isSaving ? (
            <ActivityIndicator size="large" color={themeColors.primary} />
          ) : (
            <Button label="Save Meme" onPress={handleSave} disabled={isSaving} />
          )}
        </View>
      </View>

      {/* Success animation modal */}
      <Modal
        visible={showLottieAnimation}
        transparent={false}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.lottieModalContainer}>
          <LottieView
            source={require('@assets/animations/done.json')}
            style={styles.lottieAnimation}
            autoPlay
            loop={false}
            onAnimationFinish={onLottieAnimationFinish}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;