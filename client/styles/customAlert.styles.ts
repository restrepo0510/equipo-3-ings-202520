// components/ui/CustomAlert.styles.ts
// ============================================================
// ⚠️ Custom Alert Styles
// Provides layout and theming for modal alerts with buttons
// Supports success, error, and confirmation types
// ============================================================

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  // ===========================
  // 🔹 Overlay
  // ===========================
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  overlayTouch: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // ===========================
  // 🔹 Alert Container
  // ===========================
  alertContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    width: width * 0.85,
    maxWidth: 400,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },

  // ===========================
  // 🔹 Icon Section
  // ===========================
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // ===========================
  // 🔹 Text Content
  // ===========================
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  message: {
    fontSize: 16,
    color: "#7F8C8D",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },

  // ===========================
  // 🔹 Buttons
  // ===========================
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  singleButton: {
    flex: 1,
  },

  // ----- 🟢 Default (Primary) Button -----
  defaultButton: {
    backgroundColor: "#556B2F",
    borderColor: "#145625",
  },
  defaultButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // ----- ⚪ Cancel Button -----
  cancelButton: {
    backgroundColor: "#F5F5F5",
    borderColor: "#BDC3C7",
  },
  cancelButtonText: {
    color: "#7F8C8D",
    fontSize: 16,
    fontWeight: "600",
  },

  // ----- 🔴 Destructive Button -----
  destructiveButton: {
    backgroundColor: "#E74C3C",
    borderColor: "#C0392B",
  },
  destructiveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
