import { Image } from 'react-native';
import { allMemes } from '@constants/memes';

export const getCarouselData = (
  handleNavigateToCreate: (uri: string) => void,
  navigateToTemplates: () => void,
  showImportantMessage: () => void,
  withNetworkCheck: (action: () => void) => () => void, // add this
) => {
  const handleRandomMeme = () => {
    if (!allMemes.length) return;

    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const randomMeme = allMemes[randomIndex];

    const resolved = Image.resolveAssetSource(randomMeme.image);
    const randomUri = resolved?.uri;

    if (randomUri) {
      handleNavigateToCreate(randomUri);
    } else {
      console.warn('Failed to resolve random meme image');
    }
  };

  return [
    {
      id: 1,
      text: '🎲 Start with a Random Meme',
      animation: require('@assets/animations/welcome.json'),
      onPress: withNetworkCheck(handleRandomMeme), // wrap it here!
    },
    {
      id: 2,
      text: '📂 Explore Famous Templates',
      animation: require('@assets/animations/meme.json'),
      onPress: navigateToTemplates,
    },
    {
      id: 3,
      text: '⚠️ Important Message',
      animation: require('@assets/animations/warning.json'),
      onPress: showImportantMessage,
    },
  ];
};
