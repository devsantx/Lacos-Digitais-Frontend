import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";
import { getInstitutionalStats } from "../../services/api";

const StatCard = ({ icon, label, value, color }) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <View style={[styles.statIconContainer, { backgroundColor: color + "20" }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <View style={styles.statContent}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

const CategoryBar = ({ category, count, views, maxViews }) => {
  const percentage = maxViews > 0 ? (views / maxViews) * 100 : 0;

  return (
    <View style={styles.categoryBarContainer}>
      <View style={styles.categoryBarHeader}>
        <Text style={styles.categoryBarLabel}>{category}</Text>
        <Text style={styles.categoryBarCount}>
          {count} artigo{count !== 1 ? "s" : ""}
        </Text>
      </View>

      <View style={styles.categoryBarWrapper}>
        <View style={[styles.categoryBarFill, { width: `${percentage}%` }]} />
      </View>

      <Text style={styles.categoryBarViews}>{views} visualizações</Text>
    </View>
  );
};

const TopArticleItem = ({ article, rank }) => (
  <View style={styles.topArticleItem}>
    <View style={styles.topArticleRank}>
      <Text style={styles.topArticleRankText}>#{rank}</Text>
    </View>

    <View style={styles.topArticleContent}>
      <Text style={styles.topArticleTitle} numberOfLines={2}>
        {article.title}
      </Text>
      <Text style={styles.topArticleCategory}>{article.category}</Text>
    </View>

    <View style={styles.topArticleViews}>
      <Ionicons name="eye" size={16} color={COLORS.primary} />
      <Text style={styles.topArticleViewsText}>{article.views}</Text>
    </View>
  </View>
);

export default function InstitutionStatsScreen({ navigation }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);

      const response = await getInstitutionalStats();

      if (response.data.success) {
        setStats(response.data.data);
        console.log("📊 Estatísticas carregadas:", response.data.data);
      }
    } catch (error) {
      console.error("❌ Erro ao carregar estatísticas:", error);

      if (error.response?.status === 401) {
        Alert.alert("Erro", "Sessão expirada. Faça login novamente.", [
          { text: "OK", onPress: () => navigation.replace("InstitutionLogin") },
        ]);
      } else {
        Alert.alert("Erro", "Não foi possível carregar as estatísticas");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header showBack={true} backTo="InstitutionDashboard" showLogo={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando estatísticas...</Text>
        </View>
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.container}>
        <Header showBack={true} backTo="InstitutionDashboard" showLogo={true} />
        <View style={styles.emptyContainer}>
          <Ionicons
            name="stats-chart-outline"
            size={64}
            color={COLORS.gray300}
          />
          <Text style={styles.emptyText}>Sem dados disponíveis</Text>
        </View>
      </View>
    );
  }

  const maxViews =
    stats.articlesByCategory.length > 0
      ? Math.max(...stats.articlesByCategory.map((c) => c.views))
      : 0;

  // Encontrar categoria com mais visualizações
  const topCategory =
    stats.articlesByCategory.length > 0
      ? stats.articlesByCategory.reduce((prev, current) =>
          prev.views > current.views ? prev : current
        ).category
      : "N/A";

  return (
    <View style={styles.container}>
      <Header showBack={true} backTo="InstitutionDashboard" showLogo={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Estatísticas</Text>
        <Text style={styles.subtitle}>
          Acompanhe o desempenho dos seus artigos
        </Text>

        {/* Cards de Visão Geral */}
        <View style={styles.overviewSection}>
          <StatCard
            icon="document-text"
            label="Artigos Publicados"
            value={stats.overview.totalArticles}
            color={COLORS.primary}
          />

          <StatCard
            icon="eye"
            label="Total de Visualizações"
            value={stats.overview.totalViews.toLocaleString()}
            color="#10B981"
          />

          <StatCard
            icon="trending-up"
            label="Média por Artigo"
            value={stats.overview.avgViewsPerArticle}
            color="#F59E0B"
          />
        </View>

        {/* Artigos por Categoria */}
        {stats.articlesByCategory.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Artigos por Categoria</Text>

            {stats.articlesByCategory.map((cat, index) => (
              <CategoryBar
                key={index}
                category={cat.category}
                count={parseInt(cat.count)}
                views={parseInt(cat.views)}
                maxViews={maxViews}
              />
            ))}
          </View>
        )}

        {/* Top 3 Artigos Mais Vistos */}
        {stats.topArticles.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Artigos Mais Vistos</Text>

            {stats.topArticles.map((article, index) => (
              <TopArticleItem key={index} article={article} rank={index + 1} />
            ))}
          </View>
        )}

        {/* Visualizações por Mês */}
        {stats.monthlyViews.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Visualizações por Mês</Text>

            <View style={styles.chartContainer}>
              {stats.monthlyViews.map((month, index) => {
                const maxMonthlyViews = Math.max(
                  ...stats.monthlyViews.map((m) => parseInt(m.views))
                );
                const height =
                  maxMonthlyViews > 0
                    ? (parseInt(month.views) / maxMonthlyViews) * 100
                    : 0;

                return (
                  <View key={index} style={styles.chartColumn}>
                    <View style={[styles.chartBar, { height: `${height}%` }]} />
                    <Text style={styles.chartLabel}>{month.month}</Text>
                    <Text style={styles.chartValue}>{month.views}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Insights */}
        {stats.articlesByCategory.length > 0 && (
          <View style={styles.insightCard}>
            <Ionicons name="bulb" size={24} color="#F59E0B" />
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>💡 Insight</Text>
              <Text style={styles.insightText}>
                Seus artigos na categoria "{topCategory}" são os mais populares!
                Continue investindo nessa área.
              </Text>
            </View>
          </View>
        )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.gray400,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray600,
    marginBottom: 24,
  },
  overviewSection: {
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    borderLeftWidth: 4,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  statContent: {
    justifyContent: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.gray900,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.gray600,
    marginTop: 2,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
  },
  categoryBarContainer: {
    marginBottom: 16,
  },
  categoryBarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  categoryBarLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray900,
  },
  categoryBarCount: {
    fontSize: 12,
    color: COLORS.gray500,
  },
  categoryBarWrapper: {
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    overflow: "hidden",
  },
  categoryBarFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  categoryBarViews: {
    fontSize: 12,
    color: COLORS.gray600,
    marginTop: 4,
  },
  topArticleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  topArticleRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  topArticleRankText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.white,
  },
  topArticleContent: {
    flex: 1,
  },
  topArticleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray900,
    marginBottom: 4,
  },
  topArticleCategory: {
    fontSize: 11,
    color: COLORS.gray500,
  },
  topArticleViews: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 12,
  },
  topArticleViewsText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    height: 200,
  },
  chartColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 4,
  },
  chartBar: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    marginBottom: 8,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.gray700,
    marginTop: 8,
  },
  chartValue: {
    fontSize: 10,
    color: COLORS.gray500,
    marginTop: 4,
  },
  insightCard: {
    flexDirection: "row",
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#FDE68A",
  },
  insightContent: {
    flex: 1,
    marginLeft: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray900,
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: COLORS.gray700,
    lineHeight: 20,
  },
});
