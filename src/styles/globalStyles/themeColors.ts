// Defines the shape of our theme object for robust type-checking throughout the app.
export interface AppTheme {
  background: string;
  card: string;
  text: string;
  primary: string;
  secondaryText: string;
  border: string;
  placeholder: string;
  badgeBackground: string;
  badgeText: string;
  accent: string;
  mutedBackground: string;
  quizCardBackground: string;
  quizButtonCorrect: string;
  quizButtonDefault: string;
}

// The specific color palette for the application - Soft Yellow & Warm Neutrals theme
export const themeColors: AppTheme = {
  background: '#FFFDE7',            // Soft pale yellow background
  card: '#FFFFFF',                  // Clean white for cards
  text: '#5D4037',                  // Warm dark brown for readable text
  primary: '#FFECB3',              // Buttery soft yellow for primary highlights
  secondaryText: '#8D6E63',         // Muted warm brown for secondary text
  border: '#FFEE58',                // Bright soft yellow border
  placeholder: '#BDBDBD',           // Neutral gray for placeholder text
  badgeBackground: '#FFD54F',       // Vibrant golden yellow for badges
  badgeText: '#5D4037',             // Dark brown on light backgrounds
  accent: '#FFB74D',                // Warm orange accent
  mutedBackground: '#FFF9C4',       // Very light yellow for section backgrounds
  quizCardBackground: '#FFF8E1',    // Soft cream for quiz cards
  quizButtonCorrect: '#AED581',     // Fresh light green for correct answers
  quizButtonDefault: '#F5F5F5',     // Light gray for default buttons
};

// Fonts remain unchanged
export const fonts = {
  heading: 'PressStart2P',
  body: 'MontserratRegular',
  bodyMedium: 'MontserratMedium',
  bodyBold: 'MontserratBold',
};
