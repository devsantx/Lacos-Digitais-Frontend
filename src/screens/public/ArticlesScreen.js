import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";

// 🎨 Cada artigo recebe uma cor diferente automaticamente
const BADGE_COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];

const ArticleCard = ({ index, title, summary, category, views, date, url }) => {
  const badgeColor = BADGE_COLORS[index % BADGE_COLORS.length];

  const openArticle = () => {
    Alert.alert(
      "Abrir Artigo",
      "Você será redirecionado para o site oficial do artigo científico.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Abrir", onPress: () => Linking.openURL(url) },
      ]
    );
  };

  return (
    <View style={styles.articleCard}>
      <View style={styles.articleHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: badgeColor }]}>
          <Ionicons name="document-text" size={24} color={COLORS.white} />
        </View>

        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle}>{title}</Text>
          <Text style={styles.articleSummary}>{summary}</Text>

          <View style={styles.articleMeta}>
            <Text style={styles.articleMetaText}>📚 {category}</Text>
            <Text style={styles.articleMetaText}>👁️ {views}</Text>
            <Text style={styles.articleMetaText}>📅 {date}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.readButton} onPress={openArticle}>
        <Text style={styles.readButtonText}>LER ARTIGO COMPLETO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ArticlesScreen() {
  const articles = [
    {
      title: "Internet Addiction: Summary of Research and Practice",
      summary:
        "Artigo clássico que investiga mecanismos psicológicos da dependência digital.",
      category: "Pesquisa",
      views: "580",
      date: "10/01/2025",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3480687/",
    },
    {
      title: "Internet Addiction and Its Psychological Effects",
      summary:
        "Estudo recente sobre impactos emocionais do uso excessivo da internet.",
      category: "Pesquisa",
      views: "447",
      date: "02/01/2025",
      url: "https://www.jmir.org/2020/7/e18116/",
    },
    {
      title: "Problematic Internet Use: Systematic Review",
      summary:
        "Revisão científica sobre uso problemático da internet em jovens.",
      category: "Pesquisa",
      views: "369",
      date: "15/12/2024",
      url: "https://www.sciencedirect.com/science/article/abs/pii/S0165032713003279",
    },
  ];

  return (
    <View style={styles.container}>
      {/* ✔ Agora o Header funciona corretamente */}
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
        <Text style={styles.title}>Artigos Científicos</Text>
        <Text style={styles.subtitle}>
          Links reais sobre dependência digital
        </Text>

        {articles.map((a, index) => (
          <ArticleCard key={index} index={index} {...a} />
        ))}
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray600,
    marginBottom: 24,
  },
  articleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  categoryBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray900,
    marginBottom: 6,
    lineHeight: 22,
  },
  articleSummary: {
    fontSize: 12,
    color: COLORS.gray600,
    marginBottom: 8,
    lineHeight: 18,
  },
  articleMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  articleMetaText: {
    fontSize: 12,
    color: COLORS.gray500,
  },
  readButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  readButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "bold",
  },
});
