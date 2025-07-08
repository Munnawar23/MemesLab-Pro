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

export const themeColors: AppTheme = {
  background: '#2D1B69',            // Deep retro purple
  card: '#4A148C',                  // Rich violet for cards
  text: '#E1BEE7',                  // Light lavender for main text
  primary: '#FF6B35',               // Vibrant orange primary
  secondaryText: '#B39DDB',         // Muted purple for secondary text
  border: '#FF8A65',                // Coral border accent
  placeholder: '#9575CD',           // Medium purple for placeholders
  badgeBackground: '#FFB74D',       // Warm amber for badges
  badgeText: '#2D1B69',             // Dark purple text on badges
  accent: '#FF5722',                // Deep orange accent
  mutedBackground: '#3F2A7A',       // Slightly lighter purple for muted areas
  quizCardBackground: '#512DA8',    // Deep purple for quiz cards
  quizButtonCorrect: '#4CAF50',     // Classic green for correct answers
  quizButtonDefault: '#7986CB',     // Retro blue for default buttons
};

// Fonts remain unchanged
export const fonts = {
  heading: 'PressStart2P',
  body: 'MontserratRegular',
  bodyMedium: 'MontserratMedium',
  bodyBold: 'MontserratBold',
};