import { StyleSheet } from 'react-native';
import { themeColors } from '@styles/globalStyles/themeColors';

const styles = StyleSheet.create({
  // Screen wrapper
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: themeColors.background, // Use static background
  },

  // ScrollView content container padding
  scrollContent: {
    paddingBottom: 40,
  },

  // App header
  mainHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },

  // Main app title
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: themeColors.text,
  },

  // Subtitle under title
  mainSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: themeColors.placeholder,
    opacity: 0.8,
  },

  // Section: Create your meme
  createSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border,
  },

  // Section: Meme templates
  templatesSection: {
    paddingTop: 10,
  },

  // Big section title
  primarySectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 4,
    color: themeColors.text,
  },

  // Paragraph or caption in section
  sectionDescription: {
    fontSize: 15,
    marginBottom: 20,
    paddingHorizontal: 4,
    color: themeColors.placeholder,
    opacity: 0.7,
  },

  // Subsection block (e.g. Indian Memes)
  subsection: {
    marginBottom: 20,
  },

  // Subsection title
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
    color: themeColors.text,
    opacity: 0.9,
  },

  // Card container grid layout
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // Horizontal card layout for upload options
  createOptionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },

  // Card style for "From Gallery" or "From URL"
  createOptionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: themeColors.card,
    borderColor: themeColors.border,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },

  // Emoji in card
  createOptionEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },

  // Main label in card
  createOptionText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
    color: themeColors.text,
  },

  // Subtext in card
  createOptionSubtext: {
    fontSize: 13,
    textAlign: 'center',
    color: themeColors.placeholder,
    opacity: 0.8,
  },
});

export default styles;
