export const carouselData = [
    {
      id: 1,
      text: 'Welcome to Meme Creator!',
      animation: require('@assets/animations/welcome.json'),
      onPress: () => {
        // Does nothing as requested
        console.log('Welcome card pressed');
      },
    },
    {
      id: 2,
      text: 'Browse All Meme Templates',
      animation: require('@assets/animations/meme.json'),
      onPress: () => navigation.navigate('Templates'), // Navigates to new screen
    },
    {
      id: 3,
      text: 'Tap here for a surprise message!',
      animation: require('@assets/animations/warning.json'),
      onPress: () =>
        Alert.alert(
          'Hey There!',
          'Thanks for checking out the app. Have a great day! 😄'
        ), // Shows an alert
    },
  ];