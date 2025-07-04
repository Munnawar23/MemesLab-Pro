import React from 'react';
import { TextInput, TouchableOpacity, Text, View } from 'react-native'; // Keep TextInput here
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import styles from '@styles/componentStyles/common/DraggableTextInput.styles';

// --- CHANGE 1: REMOVE THIS LINE ---
// const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface Props {
  id: number;
  value: string;
  onChangeText: (id: number, text: string) => void;
  onClose: (id: number) => void;
  textColor: string;
  initialY: number;
  canvasWidth: number;
}

const DraggableTextInput = ({
  id,
  value,
  onChangeText,
  onClose,
  textColor,
  initialY,
  canvasWidth,
}: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(initialY);

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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

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
      <View style={styles.textInputWrapper}>
        {/* --- CHANGE 2: USE A STANDARD TextInput --- */}
        <TextInput
          style={[styles.memeText, { color: textColor }]}
          placeholder="ADD TEXT HERE"
          placeholderTextColor={`${textColor}`}
          value={value}
          onChangeText={(text) => onChangeText(id, text)}
          multiline
          scrollEnabled={false}
          editable={true}
        />

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
      </View>
    </Animated.View>
  );
};

// You can optionally wrap this in React.memo for a performance boost,
// so it only re-renders when its specific props change.
export default React.memo(DraggableTextInput);