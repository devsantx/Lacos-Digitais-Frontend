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

  // ============================================================
  // Carregar dados do usuário e estatísticas
  // ============================================================
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);

        // 1. Obter dados do usuário armazenados localmente
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsed = JSON.parse(userData);
          setUserName(parsed.username || "Usuário");
          setUserId(parsed.id);

          console.log("👤 Usuário carregado:", parsed.username);

          // 2. Carregar metas do usuário
          // try {
          //   const goalsResponse = await getUserGoals(parsed.id);
          //   if (goalsResponse.data.success) {
          //     setGoalsCount(goalsResponse.data.data?.length || 0);
          //     console.log(
          //       "🎯 Metas carregadas:",
          //       goalsResponse.data.data?.length
          //     );
          //   }
          // } catch (error) {
          //   console.warn("⚠️ Erro ao carregar metas:", error.message);
          // }
          setGoalsCount(0);
          setAchievementsCount(0);

          // 3. Carregar conquistas do usuário
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

          // 4. Calcular dias da jornada (simplificado)
          // Você pode buscar do banco quando tiver endpoint pronto
          setDaysCount(5); // Placeholder
        } else {
          console.warn("⚠️ Nenhum usuário encontrado");
          // Redirecionar para login se não houver usuário
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

  // ============================================================
  // Função de Logout
  // ============================================================
  const handleLogout = async () => {
    try {
      console.log("👋 Fazendo logout...");
      await clearAuthToken();
      // Voltar para UserSelectScreen
      navigation.replace("UserSelect");
    } catch (error) {
      console.error("❌ Erro ao fazer logout:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header
          showBack={true}
          backTo="UserSelect" // Isso vai voltar para UserSelectScreen
          showLogo={true} // Isso mostra a logo Brain.png
        />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={COLORS.progressPrimary} />
          <Text style={styles.loadingText}>Carregando seu perfil...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        showBack={true}
        backTo="UserSelect" // Isso vai voltar para UserSelectScreen
        showLogo={true} // Isso mostra a logo Brain.png
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ============================================================
            CARD DE BOAS-VINDAS
            ============================================================ */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Olá, {userName}! 👋</Text>
          <Text style={styles.welcomeSubtitle}>
            Você está no seu {daysCount}º dia de jornada
          </Text>
        </View>

        {/* ============================================================
            CARDS DE ESTATÍSTICAS
            ============================================================ */}
        <View style={styles.statsContainer}>
          {/* Card: Metas Ativas */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="bullseye" size={20} color={COLORS.primary} />

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

        {/* ============================================================
            AÇÕES PRINCIPAIS
            ============================================================ */}
        <View style={styles.actionsContainer}>
          {/* Botão: Registrar Hoje */}
          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => navigation.navigate("ProgressDiary")}
          >
            <Ionicons name="book-outline" size={20} color={COLORS.white} />
            <Text style={styles.primaryActionText}>Registrar Hoje</Text>
          </TouchableOpacity>

          {/* Botão: Minhas Metas */}
          {/* <TouchableOpacity
            style={styles.secondaryAction}
            onPress={() => {
              console.log("📌 Tela de Metas ainda não implementada");
              // TODO: Implementar tela de metas
            }}
          >
            <Ionicons name="target-outline" size={20} color={COLORS.primary} />
            <Text style={styles.secondaryActionText}>Minhas Metas</Text>
          </TouchableOpacity> */}
        </View>

        {/* ============================================================
            SEÇÃO: ACESSO RÁPIDO
            ============================================================ */}
        <Text style={styles.sectionTitle}>
          Acesso Rápido - AINDA EM DESENVOLVIMENTO
        </Text>

        {/* Card: Autoavaliação */}
        <Card
          icon="bar-chart-outline"
          title="Autoavaliação"
          subtitle="Faça um questionário semanal"
          onPress={() => {
            console.log("📊 Autoavaliação clicada");
            // TODO: Implementar autoavaliação
          }}
        />

        {/* Card: Conquistas */}
        <Card
          icon="trophy-outline"
          title="Conquistas"
          subtitle="Veja suas badges desbloqueadas"
          onPress={() => {
            console.log("🏆 Conquistas clicadas");
            // TODO: Implementar página de conquistas
          }}
        />

        {/* Card: Pesquisas */}
        <Card
          icon="document-text-outline"
          title="Pesquisas"
          subtitle="Participe de estudos anônimos"
          onPress={() => {
            console.log("📋 Pesquisas clicadas");
            // TODO: Implementar pesquisas
          }}
        />

        {/* ============================================================
            BOTÃO DE LOGOUT
            ============================================================ */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutButtonText}>Fazer Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // ============================================================
  // Containers principais
  // ============================================================
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

  // ============================================================
  // Card de boas-vindas
  // ============================================================
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
    color: COLORS.white, // ✅ BRANCO (era antes a cor padrão)
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: COLORS.white, // ✅ BRANCO
    opacity: 0.9,
  },

  // ============================================================
  // Cards de estatísticas
  // ============================================================
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white, // ✅ Fundo branco (era opaco)
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

  // ============================================================
  // Ações principais
  // ============================================================
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
    elevation: 2,
  },
  secondaryActionText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
  },

  // ============================================================
  // Título de seção
  // ============================================================
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
  },

  // ============================================================
  // Botão de logout
  // ============================================================
  logoutButton: {
    backgroundColor: "#FEE2E2", // Vermelho bem claro
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

  // ============================================================
  // Textos de carregamento
  // ============================================================
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.gray600,
  },
});
