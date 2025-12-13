// src/screens/progress/ProgressDashboardScreen.js
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../../components/common/Card";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";
import { clearAuthToken, getUserAchievements } from "../../services/api";

export default function ProgressDashboardScreen({ navigation }) {
  const [userName, setUserName] = useState("Usuário");
  const [daysCount, setDaysCount] = useState(0);
  const [goalsCount, setGoalsCount] = useState(0);
  const [achievementsCount, setAchievementsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);

        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsed = JSON.parse(userData);
          setUserName(parsed.username || "Usuário");
          setUserId(parsed.id);

          console.log("👤 Usuário carregado:", parsed.username);

          setGoalsCount(0);
          setAchievementsCount(0);

          try {
            const achievementsResponse = await getUserAchievements(parsed.id);
            if (achievementsResponse.data.success) {
              setAchievementsCount(achievementsResponse.data.data?.length || 0);
              console.log(
                "🏆 Conquistas carregadas:",
                achievementsResponse.data.data?.length
              );
            }
          } catch (error) {
            console.warn("⚠️ Erro ao carregar conquistas:", error.message);
          }

          setDaysCount(5);
        } else {
          console.warn("⚠️ Nenhum usuário encontrado");
          navigation.replace("ProgressAuthScreen", { mode: "login" });
        }
      } catch (error) {
        console.error("❌ Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      console.log("👋 Fazendo logout...");
      await clearAuthToken();
      navigation.replace("UserSelect");
    } catch (error) {
      console.error("❌ Erro ao fazer logout:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header showBack={true} backTo="UserSelect" showLogo={true} />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={COLORS.progressPrimary} />
          <Text style={styles.loadingText}>Carregando seu perfil...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header showBack={true} backTo="UserSelect" showLogo={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Card de Boas-vindas */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Olá, {userName}! 👋</Text>
          <Text style={styles.welcomeSubtitle}>
            Você está no seu {daysCount}º dia de jornada
          </Text>
        </View>

        {/* Cards de Estatísticas */}
        <View style={styles.statsContainer}>
          {/* Card: Metas Ativas - ÍCONE CORRIGIDO */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="flag-outline" size={20} color={COLORS.primary} />
              <Text style={styles.statLabel}>Metas Ativas</Text>
            </View>
            <Text style={styles.statValue}>{goalsCount}</Text>
          </View>

          {/* Card: Conquistas */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons
                name="trophy-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.statLabel}>Conquistas</Text>
            </View>
            <Text style={styles.statValue}>{achievementsCount}</Text>
          </View>
        </View>

        {/* Ações Principais */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => navigation.navigate("ProgressDiary")}
          >
            <Ionicons name="book-outline" size={20} color={COLORS.white} />
            <Text style={styles.primaryActionText}>Registrar Hoje</Text>
          </TouchableOpacity>
        </View>

        {/* Seção: Acesso Rápido */}
        <Text style={styles.sectionTitle}>
          Acesso Rápido - AINDA EM DESENVOLVIMENTO
        </Text>

        <Card
          icon="bar-chart-outline"
          title="Autoavaliação"
          subtitle="Faça um questionário semanal"
          onPress={() => {
            console.log("📊 Autoavaliação clicada");
          }}
        />

        <Card
          icon="trophy-outline"
          title="Conquistas"
          subtitle="Veja suas badges desbloqueadas"
          onPress={() => {
            console.log("🏆 Conquistas clicadas");
          }}
        />

        <Card
          icon="document-text-outline"
          title="Pesquisas"
          subtitle="Participe de estudos anônimos"
          onPress={() => {
            console.log("📋 Pesquisas clicadas");
          }}
        />

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutButtonText}>Fazer Logout</Text>
        </TouchableOpacity>
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
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeCard: {
    backgroundColor: COLORS.progressPrimary,
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
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.cardBorderOpacity,
    elevation: 2,
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
    elevation: 3,
  },
  primaryActionText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: "#FEE2E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 32,
    borderWidth: 2,
    borderColor: COLORS.error,
  },
  logoutButtonText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.gray600,
  },
});
