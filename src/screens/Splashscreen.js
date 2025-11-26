import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";

export default function Splashscreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim]);

  const handleStartPress = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace("UserSelect");
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logo}>
          <View style={styles.logoInner} />
        </View>
      </Animated.View>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Laços Digitais</Text>
        <Text style={styles.subtitle}>
          Um elo entre informação,{"\n"}prevenção e cuidado.
        </Text>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: isReady ? 1 : 0,
            },
          ]}
        >
          {isReady ? (
            <TouchableOpacity
              style={styles.button}
              onPress={handleStartPress}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Vamos começar!</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={COLORS.white} />
              <Text style={styles.loadingText}>Carregando...</Text>
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "space-between",
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 8 },
    boxShadowOpacity: 0.3,
    boxShadowRadius: 16,
    elevation: 10,
  },
  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: COLORS.primary,
  },
  bottomContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.white,
    opacity: 0.9,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 26,
  },
  buttonContainer: {
    width: "100%",
    minHeight: 60,
    justifyContent: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: COLORS.white,
    fontSize: 14,
    opacity: 0.8,
  },
});
