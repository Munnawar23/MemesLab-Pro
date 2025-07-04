// This file centralizes the app's design system, including colors and fonts.
// By defining these values here, we ensure a consistent look and feel across all components
// and make future design updates much simpler to implement.

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

// The specific color palette for the application - Fresh Mint & Coral theme
// Each key is named semantically based on its intended use.
export const themeColors: AppTheme = {
  background: '#E8F5F0',            // Soft mint green background
  card: '#FFFFFF',                  // Pure white for content cards
  text: '#2C3E50',                  // Deep blue-gray for comfortable reading
  primary: '#52C4A0',               // Fresh mint green - clean and modern
  secondaryText: '#7F8C8D',         // Muted gray for secondary information
  border: '#B8E6D3',                // Light mint for subtle borders
  placeholder: '#95A5A6',           // Soft gray for placeholder text
  badgeBackground: '#FF6B47',       // Vibrant coral-orange for badges and CTAs
  badgeText: '#FFFFFF',             // White text on bright backgrounds
  accent: '#FFB84D',                // Warm orange accent for highlights
  mutedBackground: '#F0F9F6',       // Very light mint for distinct sections
  quizCardBackground: '#D1F2EB',    // Soft seafoam green for quiz cards
  quizButtonCorrect: '#2ECC71',     // Bright emerald green for correct answers
  quizButtonDefault: '#ECF0F1',     // Light gray for default buttons
};

// A centralized definition of the font families used in the app.
// Using this object instead of hardcoded strings prevents typos
// and allows for easy changes to the app's typography.
export const fonts = {
  heading: 'PressStart2P',
  body: 'MontserratRegular',
  bodyMedium: 'MontserratMedium',
  bodyBold: 'MontserratBold',
};