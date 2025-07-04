import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '@styles/globalStyles/themeColors';

const styles = StyleSheet.create({
  // --- Screen Structure ---
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  scrollContent: {
    paddingBottom: 5,
  },
  mainHeader: {
    paddingTop: 20,
    marginBottom: 5,
  },

  // --- Carousel ---
  carouselWrapper: {
    // This view takes the full screen width and is used for paging the ScrollView.
  },
  carouselCard: {
    backgroundColor: themeColors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginHorizontal: 20, // Creates a visual gap between carousel items.
    height: 200,
  },
  lottieAnimation: {
    width: '80%',
    height: 160,
    marginBottom: 5,
  },
  carouselCardText: {
    fontSize: 16,
    color: themeColors.badgeText, // Use light text for contrast.
    textAlign: 'center',
    fontFamily: fonts.bodyBold,
  },

  // --- Pagination ---
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
    width: 24,
  },

  // --- Content Sections ---
  createSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border,
  },
  featuredSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  // --- Typography ---
  primarySectionTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: themeColors.text,
    fontFamily: fonts.heading, 
  },
  sectionDescription: {
    fontSize: 15,
    marginBottom: 20,
    color: themeColors.secondaryText,
    fontFamily: fonts.body,
  },

  // --- Create Options ---
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
  },
  createOptionEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  createOptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: themeColors.text,
    fontFamily: fonts.bodyMedium,
  },

  // --- Featured Templates List ---
  flatListContent: {
    paddingTop: 5,
  },
  flatListRow: {
    justifyContent: 'space-between',
  },

  // --- Footer ---
  footerSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: themeColors.border,
    backgroundColor: themeColors.background,
  },
  footerTitle: {
    fontSize: 18,
    color: themeColors.text,
    marginBottom: 8,
    fontFamily: fonts.heading,
  },
  footerText: {
    fontSize: 15,
    color: themeColors.secondaryText,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: fonts.body,
  },
  footerSubtext: {
    fontSize: 12,
    color: themeColors.secondaryText,
    textAlign: 'center',
    opacity: 0.7,
    fontFamily: fonts.body,
  },
});

export default styles;