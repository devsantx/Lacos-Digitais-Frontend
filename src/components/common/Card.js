import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

export default function Card({
  icon,
  title,
  subtitle,
  onPress,
  variant = 'default'
}) {
  const getBackgroundColor = () => {
    if (variant === 'primary') {
      return { backgroundColor: COLORS.primary };
    }
    return { backgroundColor: COLORS.cardBgOpacity };
  };

  const getTextColor = () => {
    return variant === 'primary' ? COLORS.white : COLORS.primary;
  };

  const getSubtitleColor = () => {
    return variant === 'primary' ? COLORS.white : COLORS.gray700;
  };

  const getIconBgColor = () => {
    if (variant === 'primary') {
      return { backgroundColor: 'rgba(255, 255, 255, 0.2)' };
    }
    return { backgroundColor: 'rgba(255, 255, 255, 0.5)' };
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getBackgroundColor(),
        variant === 'default' && styles.containerBorder
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, getIconBgColor()]}>
          <Ionicons
            name={icon}
            size={32}
            color={variant === 'primary' ? COLORS.white : COLORS.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: getTextColor() }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: getSubtitleColor() }]}>
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
    boxShadowColor: '#000',
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 8,
    elevation: 3,
  },
  containerBorder: {
    borderWidth: 2,
    borderColor: COLORS.cardBorderOpacity,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
  },
});
