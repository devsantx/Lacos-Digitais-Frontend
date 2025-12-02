import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStartPress = () => navigation.replace("UserSelect");

  return (
    <View style={styles.container}>
      {/* TOPO BRANCO COM A LOGO PNG */}
      <View style={styles.topContainer}>
        <Image
          source={require("../../assets/Brain.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* FUNDO AZUL ESCURO */}
      <Animated.View
        style={[
          styles.bottomContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={styles.title}>Laços Digitais</Text>

        <Text style={styles.subtitle}>
          Um elo entre informação, {"\n"}prevenção e cuidado.
        </Text>

        {isReady ? (
          <TouchableOpacity style={styles.button} onPress={handleStartPress}>
            <Text style={styles.buttonText}>Vamos começar!</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.white} />
          </View>
        )}

        <Text style={styles.footer}>
          © {new Date().getFullYear()} - Desenvolvido por DEVSANTX
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  topContainer: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 160,
    height: 160,
  },

  bottomContainer: {
    flex: 0.8,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 35,
    paddingHorizontal: 45,
    alignItems: "center",
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 15,
    marginTop: 20,
  },

  subtitle: {
    fontSize: 22,
    color: COLORS.white,
    opacity: 0.95,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 35,
  },

  button: {
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 18,
    marginTop: 20,
  },

  buttonText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 20,
  },

  loadingContainer: {
    marginTop: 20,
  },

  footer: {
    color: COLORS.white,
    opacity: 0.9,
    fontSize: 14,
    marginTop: 40,
    position: "absolute",
    bottom: 25,
  },
});
