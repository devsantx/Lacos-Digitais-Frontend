import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";

export default function Card({
  icon,
  title,
  subtitle,
  onPress,
  variant = "default",
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        variant === "primary"
          ? styles.primaryContainer
          : styles.defaultContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            variant === "primary"
              ? styles.primaryIconContainer
              : styles.defaultIconContainer,
          ]}
        >
          <Ionicons
            name={icon}
            size={32}
            color={variant === "primary" ? COLORS.white : COLORS.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              variant === "primary" ? styles.primaryText : styles.defaultText,
            ]}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                variant === "primary"
                  ? styles.primarySubtitle
                  : styles.defaultSubtitle,
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  defaultContainer: {
    backgroundColor: COLORS.gray200, // Cor cinza única
    borderWidth: 0, // Remove borda
  },
  primaryContainer: {
    backgroundColor: COLORS.primary,
    borderWidth: 0, // Remove borda
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  defaultIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  primaryIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  defaultText: {
    color: COLORS.gray800,
  },
  primaryText: {
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 13,
  },
  defaultSubtitle: {
    color: COLORS.gray700,
  },
  primarySubtitle: {
    color: COLORS.white,
  },
});
