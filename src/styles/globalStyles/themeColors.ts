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
  background: '#FFFDE7',            
  card: '#FFFFFF',                  
  text: '#5D4037',                  
  primary: '#FFECB3',              
  secondaryText: '#8D6E63',       
  border: '#FFEE58',                
  placeholder: '#BDBDBD',           
  badgeBackground: '#FFD54F',       
  badgeText: '#5D4037',             
  accent: '#FFB74D',
  mutedBackground: '#FFF9C4',       
  quizCardBackground: '#FFF8E1',    
  quizButtonCorrect: '#AED581',    
  quizButtonDefault: '#F5F5F5',     
};

// Fonts remain unchanged
export const fonts = {
  heading: 'PressStart2P',
  body: 'MontserratRegular',
  bodyMedium: 'MontserratMedium',
  bodyBold: 'MontserratBold',
};
