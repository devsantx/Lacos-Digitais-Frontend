import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";

export default function Header({
  showBack = true,
  backTo = "UserSelect",
  showLogo = false,
}) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (backTo === "Splashscreen") {
      navigation.navigate("Splashscreen");
    } else if (backTo) {
      navigation.navigate(backTo);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Lado esquerdo - Botão de voltar ou espaço vazio */}
        <View style={styles.leftSpacer}>
          {showBack ? (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
            </TouchableOpacity>
          ) : (
            <View style={styles.backButton} />
          )}
        </View>

        {/* Centro - Logo e texto */}
        <View style={styles.logoContainer}>
          {showLogo ? (
            <Image
              source={require("../../../assets/Brain.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.logoCircle}>
              <View style={styles.logoInner} />
            </View>
          )}

          <View style={styles.textContainer}>
            <Text style={styles.title}>LAÇOS DIGITAIS</Text>
            <Text style={styles.subtitle}>
              UM ELO ENTRE INFORMAÇÃO, PREVENÇÃO E CUIDADO.
            </Text>
          </View>
        </View>

        {/* Lado direito - Espaçador para simetria */}
        <View style={styles.rightSpacer}>
          <View style={styles.hiddenButton} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48,
  },
  leftSpacer: {
    width: 60,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rightSpacer: {
    width: 60,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: COLORS.gray50,
  },
  hiddenButton: {
    width: 44,
    height: 44,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginLeft: -40,
    paddingLeft: 40,
  },
  logoImage: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logoInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 9,
    color: COLORS.gray600,
    marginTop: 2,
  },
});
