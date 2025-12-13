import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
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
import { createInstitutionalArticle } from "../../services/api";

const CATEGORIES = [
  { id: "pesquisa", label: "Pesquisa" },
  { id: "prevencao", label: "Prevenção" },
  { id: "tratamento", label: "Tratamento" },
  { id: "casos_clinicos", label: "Casos Clínicos" },
  { id: "revisao", label: "Revisão Bibliográfica" },
];

export default function InstitutionUploadArticleScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [articleUrl, setArticleUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
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

    setLoading(true);

    try {
      const articleData = {
        title: title.trim(),
        authors: authors.trim(),
        summary: summary.trim(),
        category: selectedCategory,
        url: articleUrl.trim(),
        keywords: keywords.trim() || null,
      };

      console.log("📤 Enviando artigo:", articleData);

      const response = await createInstitutionalArticle(articleData);

      if (response.data.success) {
        Alert.alert(
          "Sucesso! ✅",
          "Artigo enviado para análise. Você será notificado quando for aprovado.",
          [
            {
              text: "OK",
              onPress: () => {
                // Limpar formulário
                setTitle("");
                setAuthors("");
                setSummary("");
                setSelectedCategory(null);
                setArticleUrl("");
                setKeywords("");
                navigation.goBack();
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error("❌ Erro ao enviar artigo:", error);

      let errorMessage = "Não foi possível enviar o artigo";

      if (error.response?.status === 401) {
        errorMessage = "Sessão expirada. Faça login novamente.";
        navigation.replace("InstitutionLogin");
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header showBack={true} backTo="InstitutionDashboard" showLogo={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Publicar Artigo Científico</Text>
        <Text style={styles.subtitle}>
          Preencha os dados abaixo para submeter um novo artigo
        </Text>

        {/* Informação sobre aprovação */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={COLORS.info} />
          <Text style={styles.infoText}>
            Todos os artigos passam por uma análise antes de serem publicados na
            plataforma.
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
                  disabled={loading}
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
            title="Enviar para Análise"
            onPress={handleSubmit}
            loading={loading}
            variant="primary"
          />

          <Button
            title="Cancelar"
            onPress={() => navigation.goBack()}
            variant="outline"
            disabled={loading}
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
