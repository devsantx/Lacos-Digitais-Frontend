import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../../components/common/Card";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";

export default function InstitutionDashboardScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [institutionData, setInstitutionData] = useState(null);
  const [stats, setStats] = useState({
    articlesPublished: 0,
    totalViews: 0,
    activeResearches: 0,
  });

  useEffect(() => {
    loadInstitutionData();
  }, []);

  const loadInstitutionData = async () => {
    try {
      setLoading(true);
      // Buscar dados da instituição do AsyncStorage
      const userData = await AsyncStorage.getItem("institutionData");
      if (userData) {
        const parsed = JSON.parse(userData);
        setInstitutionData(parsed);
      }

      // TODO: Buscar estatísticas reais da API
      // Por enquanto, dados mock
      setStats({
        articlesPublished: 12,
        totalViews: 3450,
        activeResearches: 3,
      });
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados da instituição");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Fazer Logout", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("institutionData");
          await AsyncStorage.removeItem("institutionToken");
          navigation.replace("UserSelect");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header showBack={true} backTo="UserSelect" showLogo={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando...</Text>
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
          <Text style={styles.welcomeTitle}>
            Bem-vindo, {institutionData?.nome || "Instituição"}! 🎓
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Gerencie conteúdos e acompanhe o impacto das suas publicações
          </Text>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color={COLORS.primary}
            />
            <Text style={styles.statValue}>{stats.articlesPublished}</Text>
            <Text style={styles.statLabel}>Artigos Publicados</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="eye-outline" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{stats.totalViews}</Text>
            <Text style={styles.statLabel}>Visualizações</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="flask-outline" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{stats.activeResearches}</Text>
            <Text style={styles.statLabel}>Pesquisas Ativas</Text>
          </View>
        </View>

        {/* Ações Principais */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <Card
          icon="add-circle-outline"
          title="Publicar Artigo"
          subtitle="Envie um novo artigo científico"
          onPress={() => navigation.navigate("InstitutionUploadArticle")}
        />

        <Card
          icon="list-outline"
          title="Meus Artigos"
          subtitle="Visualize e edite artigos publicados"
          onPress={() => navigation.navigate("InstitutionArticlesList")}
        />

        <Card
          icon="bar-chart-outline"
          title="Estatísticas"
          subtitle="Acompanhe o desempenho do seu conteúdo"
          onPress={() => navigation.navigate("InstitutionStats")}
        />

        <Card
          icon="flask-outline"
          title="Pesquisas"
          subtitle="Gerencie suas pesquisas ativas"
          onPress={() => {
            Alert.alert(
              "Em Breve",
              "Funcionalidade de pesquisas será implementada em breve!"
            );
          }}
        />

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Fazer Logout</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.gray600,
  },
  welcomeCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
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
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray600,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
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
  logoutText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: "bold",
  },
});
