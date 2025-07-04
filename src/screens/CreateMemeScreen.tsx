import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';

import { saveMeme } from '@services/memeStorage';
import Button from '@components/common/Button';
import DraggableTextInput from '@components/common/DraggableTextInput';
import styles from '@styles/screenStyles/CreateScreen.styles';

// --- DEFINE THE SHAPE OF OUR DYNAMIC TEXT INPUT STATE ---
interface TextInputState {
  id: number;
  text: string;
  initialY: number;
}

// Navigation types
type RootStackParamList = { Create: { imageUri: string }; Main: { screen: string }; };
type CreateScreenRouteProp = RouteProp<RootStackParamList, 'Create'>;
type CreateScreenNavigationProp = NavigationProp<RootStackParamList>;

const TEXT_COLORS = ['#FFFFFF', '#000000', '#FFD700', '#FF4500', '#32CD32', '#1E90FF', '#9400D3'];
const { width } = Dimensions.get('window');
const canvasWidth = width - 40;
const canvasHeight = canvasWidth;

const CreateScreen = () => {
  const route = useRoute<CreateScreenRouteProp>();
  const navigation = useNavigation<CreateScreenNavigationProp>();
  const { imageUri } = route.params;

  // --- OUR NEW DYNAMIC STATE FOR ALL TEXT INPUTS ---
  const [textInputs, setTextInputs] = useState<TextInputState[]>([
    { id: Date.now(), text: '', initialY: 10 }, // Start with one text input at the top
  ]);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [isSaving, setIsSaving] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  /**
   * Adds a new draggable text input to the canvas.
   */
  const addTextInput = () => {
    const newTextInput: TextInputState = {
      id: Date.now(),
      text: '',
      initialY: canvasHeight / 2 - 40, // Add new text to the center
    };
    setTextInputs(currentInputs => [...currentInputs, newTextInput]);
  };

  /**
   * Updates the text for a specific input based on its ID.
   */
  const handleTextChange = (id: number, newText: string) => {
    setTextInputs(currentInputs =>
      currentInputs.map(input =>
        input.id === id ? { ...input, text: newText } : input
      )
    );
  };

  /**
   * Removes a text input, ensuring at least one always remains.
   */
  const handleCloseText = (id: number) => {
    if (textInputs.length <= 1) {
      Alert.alert('Cannot Remove', 'At least one text field must be visible.');
      return;
    }
    setTextInputs(currentInputs => currentInputs.filter(input => input.id !== id));
  };

  const handleSave = async () => {
  if (!viewShotRef.current) return;

  setIsSaving(true);

  try {
    const uri = await viewShotRef.current.capture?.();

    if (!uri) {
      Alert.alert('Error', 'Could not capture the meme.');
      return;
    }

    await saveMeme({ imageUri: uri });

    Alert.alert('Success', 'Meme saved successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Main', { screen: 'Gallery' }),
      },
    ]);
  } catch (err) {
    console.error(err);
    Alert.alert('Error', 'Something went wrong while saving the meme.');
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
        <ViewShot ref={viewShotRef} style={styles.canvasContainer} options={{ format: 'jpg', quality: 0.9 }}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          
          {/* --- RENDER ALL TEXT INPUTS FROM STATE --- */}
          {textInputs.map(input => (
            <DraggableTextInput
              key={input.id}
              id={input.id}
              value={input.text}
              onChangeText={handleTextChange}
              onClose={handleCloseText}
              textColor={textColor}
              initialY={input.initialY}
              canvasWidth={canvasWidth}
            />
          ))}
        </ViewShot>

        <View style={styles.colorPaletteContainer}>
          <Text style={styles.paletteTitle}>Choose Text Color</Text>
          <View style={styles.colorPalette}>
            {TEXT_COLORS.map((color) => (
              <TouchableOpacity key={color} style={[styles.colorSwatch, { backgroundColor: color }, textColor === color && styles.activeColorSwatch]} onPress={() => setTextColor(color)} />
            ))}
          </View>
        </View>

        {/* --- NEW "ADD TEXT" BUTTON --- */}
        <TouchableOpacity style={styles.addTextButton} onPress={addTextInput}>
          <Text style={styles.addTextButtonText}>+ Add Another Text</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          {isSaving ? <ActivityIndicator size="large" color={styles.activeColorSwatch.borderColor} /> : <Button label="Save Meme" onPress={handleSave} />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;