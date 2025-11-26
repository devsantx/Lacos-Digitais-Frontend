import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";

const featureList = [
  {
    icon: "book-outline",
    title: "Diário Digital",
    text: "Registre seu uso diário de internet e identifique padrões",
  },
  {
    icon: "target-outline",
    title: "Metas Personalizadas",
    text: "Defina e acompanhe objetivos de redução de uso",
  },
  {
    icon: "trophy-outline",
    title: "Sistema de Conquistas",
    text: "Desbloqueie badges conforme progride na sua jornada",
  },
  {
    icon: "bar-chart-outline",
    title: "Autoavaliações",
    text: "Responda questionários periódicos sobre seu bem-estar",
  },
];

export default function ProgressWelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header backTo="UserSelect" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="trending-up" size={64} color={COLORS.white} />
          </View>
          <Text style={styles.title}>Meu Progresso</Text>
          <Text style={styles.subtitle}>
            Área pessoal e 100% anônima para acompanhar sua jornada
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>O que você encontra aqui:</Text>

          {featureList.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons
                  name={feature.icon}
                  size={32}
                  color={COLORS.progressPrimary}
                />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Privacy Card */}
        <View style={styles.privacyCard}>
          <Ionicons name="shield-checkmark" size={48} color={COLORS.success} />
          <Text style={styles.privacyTitle}>Sua Privacidade é Garantida</Text>
          <Text style={styles.privacyText}>
            • Não coletamos dados pessoais{"\n"}• Você escolhe um username
            anônimo{"\n"}• Seus dados são criptografados{"\n"}• Pode deletar sua
            conta a qualquer momento
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Criar Conta Anônima"
            onPress={() =>
              navigation.navigate("ProgressAuthScreen", { mode: "register" })
            }
            variant="secondary"
          />

          <Button
            title="Já tenho conta"
            onPress={() =>
              navigation.navigate("ProgressAuthScreen", { mode: "login" })
            }
            variant="outline"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  heroSection: {
    backgroundColor: COLORS.progressPrimary,
    paddingHorizontal: 24,
    paddingVertical: 48,
    alignItems: "center",
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
    textAlign: "center",
    lineHeight: 24,
  },
  featuresContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(124, 58, 237, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
    justifyContent: "center",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray900,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.gray600,
    lineHeight: 20,
  },
  privacyCard: {
    marginHorizontal: 24,
    marginTop: 32,
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#BBF7D0",
    padding: 24,
    alignItems: "center",
  },
  privacyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray900,
    marginTop: 16,
    marginBottom: 12,
  },
  privacyText: {
    fontSize: 14,
    color: COLORS.gray700,
    lineHeight: 24,
    textAlign: "center",
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    marginTop: 32,
    gap: 12,
  },
});
