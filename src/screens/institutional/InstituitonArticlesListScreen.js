import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";
import {
  deleteInstitutionalArticle,
  getInstitutionalArticles,
} from "../../services/api";

const STATUS_CONFIG = {
  pending: {
    label: "Em Análise",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
    icon: "time-outline",
  },
  approved: {
    label: "Aprovado",
    color: "#10B981",
    bgColor: "#D1FAE5",
    icon: "checkmark-circle-outline",
  },
  rejected: {
    label: "Rejeitado",
    color: "#EF4444",
    bgColor: "#FEE2E2",
    icon: "close-circle-outline",
  },
};

const ArticleCard = ({ article, onPress }) => {
  const statusConfig = STATUS_CONFIG[article.status];

  return (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header com categoria e status */}
      <View style={styles.articleHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{article.category}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusConfig.bgColor },
          ]}
        >
          <Ionicons
            name={statusConfig.icon}
            size={14}
            color={statusConfig.color}
          />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      {/* Título */}
      <Text style={styles.articleTitle}>{article.title}</Text>

      {/* Autores */}
      <Text style={styles.articleAuthors}>{article.authors}</Text>

      {/* Footer com visualizações e data */}
      <View style={styles.articleFooter}>
        <View style={styles.articleMeta}>
          <Ionicons name="eye-outline" size={16} color={COLORS.gray500} />
          <Text style={styles.articleMetaText}>{article.views} views</Text>
        </View>

        <Text style={styles.articleDate}>
          {new Date(article.created_at).toLocaleDateString("pt-BR")}
        </Text>
      </View>

      {/* Motivo de rejeição (se houver) */}
      {article.status === "rejected" && article.rejection_reason && (
        <View style={styles.rejectionBox}>
          <Ionicons name="alert-circle" size={16} color={COLORS.error} />
          <Text style={styles.rejectionText}>{article.rejection_reason}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function InstitutionArticlesListScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);

      const response = await getInstitutionalArticles();

      if (response.data.success) {
        setArticles(response.data.data);
        console.log("✅ Artigos carregados:", response.data.data.length);
      }
    } catch (error) {
      console.error("❌ Erro ao carregar artigos:", error);

      if (error.response?.status === 401) {
        Alert.alert("Erro", "Sessão expirada. Faça login novamente.", [
          { text: "OK", onPress: () => navigation.replace("InstitutionLogin") },
        ]);
      } else {
        Alert.alert("Erro", "Não foi possível carregar os artigos");
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadArticles();
    setRefreshing(false);
  }, []);

  const handleArticlePress = (article) => {
    const actions = [
      {
        text: "Ver Detalhes",
        onPress: () => {
          Alert.alert(
            article.title,
            `Status: ${STATUS_CONFIG[article.status].label}\n\nAutores: ${
              article.authors
            }\n\nResumo: ${article.summary}`,
            [{ text: "OK" }]
          );
        },
      },
      {
        text: "Editar",
        onPress: () => {
          if (article.status !== "pending") {
            Alert.alert(
              "Não Permitido",
              "Apenas artigos pendentes podem ser editados"
            );
            return;
          }
          navigation.navigate("InstitutionEditArticle", {
            articleId: article.id,
          });
        },
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => handleDelete(article),
      },
      { text: "Cancelar", style: "cancel" },
    ];

    Alert.alert("Ações", "O que deseja fazer com este artigo?", actions);
  };

  const handleDelete = (article) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir "${article.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await deleteInstitutionalArticle(article.id);

              if (response.data.success) {
                Alert.alert("Sucesso", "Artigo excluído com sucesso");
                // Remover da lista
                setArticles((prev) => prev.filter((a) => a.id !== article.id));
              }
            } catch (error) {
              console.error("❌ Erro ao deletar artigo:", error);
              Alert.alert("Erro", "Não foi possível excluir o artigo");
            }
          },
        },
      ]
    );
  };

  const filteredArticles = articles.filter((article) => {
    if (filter === "all") return true;
    return article.status === filter;
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Header showBack={true} backTo="InstitutionDashboard" showLogo={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando artigos...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header showBack={true} backTo="InstitutionDashboard" showLogo={true} />

      <View style={styles.content}>
        <Text style={styles.title}>Meus Artigos</Text>
        <Text style={styles.subtitle}>
          Total: {filteredArticles.length} artigo(s)
        </Text>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === "all" && styles.filterChipActive,
            ]}
            onPress={() => setFilter("all")}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === "all" && styles.filterChipTextActive,
              ]}
            >
              Todos ({articles.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === "pending" && styles.filterChipActive,
            ]}
            onPress={() => setFilter("pending")}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === "pending" && styles.filterChipTextActive,
              ]}
            >
              Em Análise (
              {articles.filter((a) => a.status === "pending").length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === "approved" && styles.filterChipActive,
            ]}
            onPress={() => setFilter("approved")}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === "approved" && styles.filterChipTextActive,
              ]}
            >
              Aprovados (
              {articles.filter((a) => a.status === "approved").length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === "rejected" && styles.filterChipActive,
            ]}
            onPress={() => setFilter("rejected")}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === "rejected" && styles.filterChipTextActive,
              ]}
            >
              Rejeitados (
              {articles.filter((a) => a.status === "rejected").length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Artigos */}
        {filteredArticles.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="document-text-outline"
              size={64}
              color={COLORS.gray300}
            />
            <Text style={styles.emptyText}>Nenhum artigo encontrado</Text>
            <Text style={styles.emptySubtext}>
              Publique seu primeiro artigo para começar!
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredArticles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ArticleCard
                article={item}
                onPress={() => handleArticlePress(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.primary]}
              />
            }
          />
        )}
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
    paddingHorizontal: 24,
    paddingTop: 16,
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray600,
    marginBottom: 16,
  },
  filtersContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  filterChip: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.gray700,
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  listContent: {
    paddingBottom: 16,
  },
  articleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  articleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: COLORS.cardBgOpacity,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray900,
    marginBottom: 8,
    lineHeight: 22,
  },
  articleAuthors: {
    fontSize: 13,
    color: COLORS.gray600,
    marginBottom: 12,
  },
  articleFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  articleMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  articleMetaText: {
    fontSize: 12,
    color: COLORS.gray500,
  },
  articleDate: {
    fontSize: 12,
    color: COLORS.gray500,
  },
  rejectionBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 12,
    padding: 12,
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
  },
  rejectionText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.error,
    lineHeight: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray400,
    marginTop: 16,
    fontWeight: "600",
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.gray400,
    marginTop: 8,
  },
});
