// No changes were needed in this component file.
// All styling is correctly handled by the stylesheet.
// The provided code was already well-structured.

import React from 'react';
import { TextInput, TouchableOpacity, Text, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import styles from '@styles/componentStyles/common/DraggableTextInput.styles';

interface Props {
  id: number;
  value: string;
  onChangeText: (id: number, text: string) => void;
  onClose: (id: number) => void;
  textColor: string;
  initialY: number;
  canvasWidth: number;
  isSaving?: boolean;
}

// A draggable and editable text input, primarily for the meme editor canvas.
const DraggableTextInput = ({
  id,
  value,
  onChangeText,
  onClose,
  textColor,
  initialY,
  canvasWidth,
  isSaving,
}: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(initialY);

  // Handles drag gestures to update the text's position on the canvas.
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
      context.y = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.x + event.translationX;
      translateY.value = context.y + event.translationY;
    },
  });

  // Creates the animated style for the container based on shared values.
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  // Renders a single drag handle at a specified corner.
  const renderDragHandle = (positionStyle: object, key: string) => (
    <PanGestureHandler key={key} onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.dragHandle, positionStyle]}>
        <Text style={styles.dragHandleIcon}>⬤</Text>
      </Animated.View>
    </PanGestureHandler>
  );

  return (
    <Animated.View
      style={[
        styles.draggableContainer,
        animatedStyle,
        { width: canvasWidth },
      ]}
    >
      <View
        style={[
          styles.textInputWrapper,
          isSaving && { borderWidth: 0, backgroundColor: 'transparent' },
        ]}
      >
        <TextInput
          style={[styles.memeText, { color: textColor }]}
          placeholder="ADD TEXT HERE"
          placeholderTextColor={textColor}
          value={value}
          onChangeText={(text) => onChangeText(id, text)}
          multiline
          scrollEnabled={false}
          editable={!isSaving}
        />

        {/* The close button and drag handles are hidden when saving the final image. */}
        {!isSaving && (
          <>
            <TouchableOpacity
              style={styles.closeButtonCenter}
              onPress={() => onClose(id)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {renderDragHandle(styles.dragHandleTopLeft, 'tl')}
            {renderDragHandle(styles.dragHandleTopRight, 'tr')}
            {renderDragHandle(styles.dragHandleBottomLeft, 'bl')}
            {renderDragHandle(styles.dragHandleBottomRight, 'br')}
          </>
        )}
      </View>
    </Animated.View>
  );
};

export default React.memo(DraggableTextInput);