import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";

export default function InstitutionDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header backTo="UserSelect" />

      <View style={styles.content}>
        <Text style={styles.title}>Dashboard Institucional</Text>
        <Text style={styles.subtitle}>
          Bem-vindo à área de instituições! Aqui você pode gerenciar conteúdos e
          parcerias.
        </Text>
        <Text style={styles.subtitle}>OBS: Área ainda em desenvolvimento</Text>

        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          variant="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray600,
    marginBottom: 32,
    lineHeight: 22,
  },
});
