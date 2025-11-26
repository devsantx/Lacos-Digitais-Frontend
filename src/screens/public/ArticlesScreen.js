import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import { COLORS } from '../../constants/colors';

const ArticleCard = ({ title, summary, category, views, date }) => {
  const getCategoryColor = () => {
    switch(category) {
      case 'Pesquisa': return '#3B82F6';
      case 'Prevenção': return '#10B981';
      case 'Caso Clínico': return '#8B5CF6';
      default: return COLORS.primary;
    }
  };

  return (
    <View style={styles.articleCard}>
      <View style={styles.articleHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor() }]}>
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
      <TouchableOpacity style={styles.readButton}>
        <Text style={styles.readButtonText}>LER ARTIGO COMPLETO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ArticlesScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Artigos Científicos</Text>
        <Text style={styles.subtitle}>Conteúdo produzido por estudantes e pesquisadores</Text>

        <ArticleCard
          title="Impacto das Redes Sociais na Saúde Mental de Adolescentes"
          summary="Este estudo investiga os efeitos do uso prolongado de redes sociais..."
          category="Pesquisa"
          views="342"
          date="15/10/2025"
        />

        <ArticleCard
          title="Estratégias de Prevenção à Dependência Digital"
          summary="Análise de técnicas eficazes para prevenção e tratamento..."
          category="Prevenção"
          views="298"
          date="10/10/2025"
        />

        <ArticleCard
          title="Caso Clínico: Recuperação de Dependência de Internet"
          summary="Relato de caso sobre tratamento bem-sucedido de DI em adulto jovem..."
          category="Caso Clínico"
          views="267"
          date="05/10/2025"
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
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
    boxShadowColor: '#000',
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 4,
    elevation: 3,
  },
  articleHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 8,
    lineHeight: 22,
  },
  articleSummary: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 8,
    lineHeight: 20,
  },
  articleMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    alignItems: 'center',
  },
  readButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
