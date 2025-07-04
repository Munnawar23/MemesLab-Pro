import { StyleSheet } from 'react-native';
import { themeColors } from '@styles/globalStyles/themeColors';

const styles = StyleSheet.create({
  // Screen wrapper
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },

  // ScrollView content container padding
  scrollContent: {
    paddingBottom: 5,
  },

  // App header - contains the carousel
  mainHeader: {
    paddingTop: 20,
    marginBottom: 5,
  },

  // --- UPDATED: Carousel Styles for Spacing ---
  carouselWrapper: {
    // This View takes the full screen width and is used for paging
  },
  carouselCard: {
    backgroundColor: themeColors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginHorizontal: 20, // THIS CREATES THE GAP BETWEEN CARDS
    height: 200, // Give it a fixed height
  },

  lottieAnimation: {
    width: '80%',
    height: 160, // Adjusted height
    marginBottom: 5,
  },

  carouselCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.text,
    textAlign: 'center',
  },

  // Pagination Dot Styles
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: themeColors.border,
    marginHorizontal: 4,
  },

  paginationDotActive: {
    backgroundColor: themeColors.primary,
    width: 24, // Make active dot wider
  },
  // --- END of New/Updated Styles ---

  // Section: Create your meme
  createSection: {
    paddingHorizontal: 20, // Add padding here now that it's out of container
    marginBottom: 30,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border,
  },

  // Big section title
  primarySectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: themeColors.text,
  },

  // Paragraph or caption in section
  sectionDescription: {
    fontSize: 15,
    marginBottom: 20,
    color: themeColors.placeholder,
    opacity: 0.9,
  },

  // Horizontal card layout for upload options
  createOptionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },

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

  createOptionEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },

  createOptionText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
    color: themeColors.text,
  },

  createOptionSubtext: {
    fontSize: 13,
    textAlign: 'center',
    color: themeColors.placeholder,
    opacity: 0.8,
  },

  // --- NEW: Featured Templates Section Styles ---
  featuredSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  // FlatList styles
  flatListContent: {
    paddingTop: 5,
  },

  flatListRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },

  // --- NEW: Footer Section Styles ---
  footerSection: {
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: themeColors.border,
    backgroundColor: themeColors.background,
  },

  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.text,
    marginBottom: 8,
  },

  footerText: {
    fontSize: 15,
    color: themeColors.placeholder,
    textAlign: 'center',
    marginBottom: 10,
    opacity: 0.9,
  },

  footerSubtext: {
    fontSize: 12,
    color: themeColors.placeholder,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default styles;