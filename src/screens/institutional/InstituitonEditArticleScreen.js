import { Ionicons } from "@expo/vector-icons";
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
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";
import {
  getInstitutionalArticleById,
  updateInstitutionalArticle,
} from "../../services/api";

const CATEGORIES = [
  { id: "pesquisa", label: "Pesquisa" },
  { id: "prevencao", label: "Prevenção" },
  { id: "tratamento", label: "Tratamento" },
  { id: "casos_clinicos", label: "Casos Clínicos" },
  { id: "revisao", label: "Revisão Bibliográfica" },
];

export default function InstitutionEditArticleScreen({ navigation, route }) {
  const { articleId } = route.params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [articleUrl, setArticleUrl] = useState("");
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    loadArticle();
  }, []);

  const loadArticle = async () => {
    try {
      setLoading(true);

      const response = await getInstitutionalArticleById(articleId);

      if (response.data.success) {
        const article = response.data.data;

        setTitle(article.title);
        setAuthors(article.authors);
        setSummary(article.summary);
        setSelectedCategory(article.category);
        setArticleUrl(article.url);
        setKeywords(article.keywords || "");

        console.log("✅ Artigo carregado para edição");
      }
    } catch (error) {
      console.error("❌ Erro ao carregar artigo:", error);

      Alert.alert("Erro", "Não foi possível carregar o artigo", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Validações
    if (!title.trim()) {
      Alert.alert("Erro", "O título é obrigatório");
      return;
    }

    if (!authors.trim()) {
      Alert.alert("Erro", "Os autores são obrigatórios");
      return;
    }

    if (!summary.trim()) {
      Alert.alert("Erro", "O resumo é obrigatório");
      return;
    }

    if (!selectedCategory) {
      Alert.alert("Erro", "Selecione uma categoria");
      return;
    }

    if (!articleUrl.trim()) {
      Alert.alert("Erro", "A URL do artigo é obrigatória");
      return;
    }

    // Validar URL
    const urlPattern = /^https?:\/\/.+/i;
    if (!urlPattern.test(articleUrl)) {
      Alert.alert(
        "Erro",
        "Digite uma URL válida (começando com http:// ou https://)"
      );
      return;
    }

    setSaving(true);

    try {
      const articleData = {
        title: title.trim(),
        authors: authors.trim(),
        summary: summary.trim(),
        category: selectedCategory,
        url: articleUrl.trim(),
        keywords: keywords.trim() || null,
      };

      console.log("📤 Atualizando artigo:", articleData);

      const response = await updateInstitutionalArticle(articleId, articleData);

      if (response.data.success) {
        Alert.alert("Sucesso! ✅", "Artigo atualizado com sucesso", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar artigo:", error);

      let errorMessage = "Não foi possível atualizar o artigo";

      if (error.response?.status === 401) {
        errorMessage = "Sessão expirada. Faça login novamente.";
        navigation.replace("InstitutionLogin");
      } else if (error.response?.status === 400) {
        errorMessage =
          error.response.data.error ||
          "Apenas artigos pendentes podem ser editados";
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert("Erro", errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header
          showBack={true}
          backTo="InstitutionArticlesList"
          showLogo={true}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando artigo...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        showBack={true}
        backTo="InstitutionArticlesList"
        showLogo={true}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Editar Artigo</Text>
        <Text style={styles.subtitle}>
          Atualize as informações do artigo abaixo
        </Text>

        {/* Info: Apenas artigos pendentes */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={COLORS.info} />
          <Text style={styles.infoText}>
            Apenas artigos com status "Em Análise" podem ser editados.
          </Text>
        </View>

        <View style={styles.form}>
          {/* Título */}
          <FormInput
            label="Título do Artigo"
            placeholder="Ex: Dependência de Internet em Adolescentes..."
            value={title}
            onChangeText={setTitle}
            required
          />

          {/* Autores */}
          <FormInput
            label="Autores"
            placeholder="Ex: João Silva, Maria Santos, Pedro Costa"
            value={authors}
            onChangeText={setAuthors}
            required
          />

          {/* Categoria */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Categoria <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.categoriesContainer}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    selectedCategory === cat.id && styles.categoryChipSelected,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                  activeOpacity={0.7}
                  disabled={saving}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedCategory === cat.id &&
                        styles.categoryChipTextSelected,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Resumo */}
          <FormInput
            label="Resumo"
            placeholder="Escreva um resumo claro e objetivo do artigo..."
            value={summary}
            onChangeText={setSummary}
            multiline
            numberOfLines={6}
            required
          />

          {/* URL do Artigo */}
          <FormInput
            label="URL do Artigo"
            placeholder="https://exemplo.com/artigo.pdf"
            value={articleUrl}
            onChangeText={setArticleUrl}
            keyboardType="url"
            required
          />

          {/* Palavras-chave */}
          <FormInput
            label="Palavras-chave (opcional)"
            placeholder="Ex: dependência digital, saúde mental, adolescentes"
            value={keywords}
            onChangeText={setKeywords}
          />

          {/* Botões */}
          <Button
            title="Salvar Alterações"
            onPress={handleSave}
            loading={saving}
            variant="primary"
          />

          <Button
            title="Cancelar"
            onPress={() => navigation.goBack()}
            variant="outline"
            disabled={saving}
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
    lineHeight: 22,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#BFDBFE",
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray700,
    lineHeight: 20,
  },
  form: {
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray700,
    marginBottom: 12,
  },
  required: {
    color: COLORS.error,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryChip: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gray700,
  },
  categoryChipTextSelected: {
    color: COLORS.white,
  },
});
