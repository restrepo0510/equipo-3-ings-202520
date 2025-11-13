// styles/layout.styles.ts
// ============================================================
// 📘 Layout Styles
// Shared styles for loading and layout background
// ============================================================

import { StyleSheet } from "react-native";

/**
 * Global styles used in layout and loading components.
 */
export const styles = StyleSheet.create({
  /**
   * Centered container used for loading states or empty screens.
   * Ensures content is both vertically and horizontally centered.
   */
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Default white background applied to main content areas.
   */
  contentBackground: {
    backgroundColor: "#FFFFFF",
  },
});
