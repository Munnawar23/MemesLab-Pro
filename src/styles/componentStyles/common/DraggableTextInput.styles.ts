import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  draggableContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  textInputWrapper: {
    width: '90%',

    padding: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  memeText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10,
    fontFamily: Platform.OS === 'ios' ? 'Impact' : 'sans-serif-condensed',
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
  },

  closeButtonCenter: {
    position: 'absolute',
    top: -15,
    left: '50%',
    transform: [{ translateX: -10 }],
    backgroundColor: '#000',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 14,
  },

  dragHandle: {
    position: 'absolute',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 3,
  },
  dragHandleIcon: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },

  dragHandleTopLeft: {
    top: -10,
    left: -10,
  },
  dragHandleTopRight: {
    top: -10,
    right: -10,
  },
  dragHandleBottomLeft: {
    bottom: -10,
    left: -10,
  },
  dragHandleBottomRight: {
    bottom: -10,
    right: -10,
  },
});

export default styles;