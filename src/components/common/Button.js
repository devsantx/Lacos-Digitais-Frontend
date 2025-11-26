import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";

const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = true,
}) => {
  const variants = {
    primary: { bg: COLORS.primary, text: COLORS.white },
    secondary: { bg: COLORS.progressPrimary, text: COLORS.white },
    danger: { bg: COLORS.error, text: COLORS.white },
    outline: {
      bg: COLORS.white,
      text: COLORS.primary,
      border: 2,
      borderColor: COLORS.primary,
    },
  };

  const sizes = {
    sm: { padding: 8, fontSize: 13 },
    md: { padding: 12, fontSize: 15 },
    lg: { padding: 16, fontSize: 18 },
  };

  const variantStyle = variants[variant];
  const sizeStyle = sizes[size];

  const buttonStyle = {
    backgroundColor: variantStyle.bg,
    paddingVertical: sizeStyle.padding,
    opacity: disabled || loading ? 0.6 : 1,
    width: fullWidth ? "100%" : "auto",
    borderWidth: variantStyle.border || 0,
    borderColor: variantStyle.borderColor || "transparent",
  };

  const textStyle = {
    color: variantStyle.text,
    fontSize: sizeStyle.fontSize,
    fontWeight: "bold",
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{loading ? "Carregando..." : title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
});

export default Button;
