export interface AppTheme {
  background: string;
  card: string;
  text: string;
  primary: string;
  secondaryText: string;
  border: string;
  placeholder: string;
  badgeBackground: string; // added
  badgeText: string;       // added
}

export const themeColors: AppTheme = {
  background: '#FFFDF7',        // Almost white with a hint of warmth
  card: '#FFFFFF',              // Pure white cards
  text: '#000000',              // Black text for readability
  primary: '#FEE440',           // Soft light yellow for buttons & highlights (#FEE440)
  secondaryText: '#7D7D7D',     // Medium gray for secondary text
  border: '#F7DC6F',            // Light muted yellow border
  placeholder: '#BDBDBD',       // Light gray placeholder
  badgeBackground: '#000000',   // Solid black badge
  badgeText: '#FFFFFF',         // White text on badges
};