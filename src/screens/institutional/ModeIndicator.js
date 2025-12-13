// src/components/institutional/ModeIndicator.js
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";

export default function ModeIndicator({ mode, onToggle }) {
  return (
    <View
      style={[
        styles.container,
        mode === "mock" ? styles.mockContainer : styles.realContainer,
      ]}
    >
      <View style={styles.content}>
        <Ionicons
          name={mode === "mock" ? "beaker-outline" : "rocket-outline"}
          size={16}
          color={mode === "mock" ? "#92400E" : "#065F46"}
        />
        <Text
          style={[
            styles.text,
            mode === "mock" ? styles.mockText : styles.realText,
          ]}
        >
          {mode === "mock" ? "Modo Desenvolvimento" : "Modo Produção"}
        </Text>
      </View>

      {onToggle && (
        <TouchableOpacity onPress={onToggle} style={styles.toggleButton}>
          <Text style={styles.toggleText}>
            {mode === "mock" ? "Produção" : "Desenvolvimento"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  mockContainer: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  realContainer: {
    backgroundColor: "#D1FAE5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
  mockText: {
    color: "#92400E",
  },
  realText: {
    color: "#065F46",
  },
  toggleButton: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  toggleText: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
