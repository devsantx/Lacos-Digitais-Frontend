import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../../components/common/Card";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";

export default function ProgressDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Olá, usuario123! 👋</Text>
          <Text style={styles.welcomeSubtitle}>
            Você está no seu 5º dia de jornada
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons
                name="target-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.statLabel}>Metas Ativas</Text>
            </View>
            <Text style={styles.statValue}>2</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons
                name="trophy-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.statLabel}>Conquistas</Text>
            </View>
            <Text style={styles.statValue}>3</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => navigation.navigate("ProgressDiary")}
          >
            <Ionicons name="book-outline" size={20} color={COLORS.white} />
            <Text style={styles.primaryActionText}>Registrar Hoje</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryAction}>
            <Ionicons name="target-outline" size={20} color={COLORS.primary} />
            <Text style={styles.secondaryActionText}>Minhas Metas</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Acesso Rápido</Text>

        <Card
          icon="bar-chart-outline"
          title="Autoavaliação"
          subtitle="Faça um questionário semanal"
          onPress={() => {}}
        />

        <Card
          icon="trophy-outline"
          title="Conquistas"
          subtitle="Veja suas badges desbloqueadas"
          onPress={() => {}}
        />

        <Card
          icon="document-text-outline"
          title="Pesquisas"
          subtitle="Participe de estudos anônimos"
          onPress={() => {}}
        />
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  welcomeCard: {
    backgroundColor: `linear-gradient(135deg, ${COLORS.progressPrimary}, ${COLORS.progressSecondary})`,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 4 },
    boxShadowOpacity: 0.2,
    boxShadowRadius: 8,
    elevation: 5,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: COLORS.white,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBgOpacity,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.cardBorderOpacity,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gray700,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  primaryAction: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryActionText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryAction: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  secondaryActionText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
  },
});
