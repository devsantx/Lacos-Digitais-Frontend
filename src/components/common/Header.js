import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";

export default function Header({
  showBack = true,
  backTo = "UserSelect",
  showLogo = false,
  customBackAction, // Permite ação customizada de voltar
}) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (customBackAction) {
      customBackAction(); // Usa ação customizada se fornecida
    } else if (backTo === "Splashscreen") {
      navigation.navigate("Splashscreen");
    } else if (backTo) {
      navigation.navigate(backTo);
    } else {
      navigation.goBack(); // Volta para tela anterior por padrão
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Espaçador do lado esquerdo */}
        <View style={styles.leftSpacer}>
          {showBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {/* Usando o ícone de seta mais grossa (arrow-back) */}
              <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Logo e texto centralizados à direita */}
        <View style={styles.logoAndText}>
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

        {/* Espaçador do lado direito para balancear */}
        <View style={styles.rightSpacer}>
          {showBack && <View style={styles.hiddenButton} />}
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
    paddingHorizontal: 8, // Reduzi um pouco o padding horizontal
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48, // Altura mínima
  },
  leftSpacer: {
    width: 60, // Largura fixa para alinhamento
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rightSpacer: {
    width: 60, // Largura fixa para simetria
    alignItems: "flex-end",
    justifyContent: "center",
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: COLORS.gray50, // Fundo sutil
  },
  hiddenButton: {
    width: 44,
    height: 44,
  },
  logoAndText: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginLeft: -40, // Move tudo para direita
    paddingLeft: 40, // Compensa o margin
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
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    letterSpacing: 0.5,
    textAlign: "left", // Alinha à esquerda dentro do container
  },
  subtitle: {
    fontSize: 9,
    color: COLORS.gray600,
    marginTop: 2,
    textAlign: "left", // Alinha à esquerda dentro do container
  },
});
