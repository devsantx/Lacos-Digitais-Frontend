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
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";

const NewsCard = ({ title, source, url }) => {
  const handlePress = () => {
    if (url) {
      Linking.openURL(url).catch((err) => {
        Alert.alert("Erro", "Não foi possível abrir o link");
      });
    } else {
      Alert.alert("Aviso", "Link será configurado em breve");
    }
  };

  return (
    <View style={styles.newsCard}>
      <Text style={styles.newsTitle}>{title}</Text>
      <View style={styles.newsFooter}>
        <Text style={styles.newsSource}>{source}</Text>
        <TouchableOpacity style={styles.newsButton} onPress={handlePress}>
          <Text style={styles.newsButtonText}>CONFIRA AQUI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function PopulationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>NOTÍCIAS</Text>

        <NewsCard
          title="Vício em internet pode afetar comportamento e desenvolvimento de adolescentes."
          source="CNN | BRASIL"
          url="https://www.cnnbrasil.com.br"
        />

        <NewsCard
          title="Todos os adolescentes são viciados em redes sociais?"
          source="G1 | GLOBO"
          url="https://g1.globo.com"
        />

        <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          QUIZ
        </Text>

        <NewsCard
          title="RESPONDA ESSE QUIZ E VEJA SE VOCÊ SOFRE COM DEPENDÊNCIA DE INTERNET."
          source="ALUNOS ETVC"
        />

        <NewsCard
          title="RESPONDA ESSE QUIZ E VEJA SE VOCÊ CONHECE ALGUÉM QUE TENHA DI."
          source="Giulia Jacometo"
        />

        {/* Botões de Navegação */}
        <View style={styles.navigationSection}>
          <Button
            title="VER ARTIGOS CIENTÍFICOS"
            onPress={() => navigation.navigate("Articles")}
            variant="secondary"
          />

          <Button
            title="VOLTAR"
            onPress={() => navigation.goBack()}
            variant="outline"
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
  },
  sectionTitleSpaced: {
    marginTop: 32,
  },
  newsCard: {
    backgroundColor: COLORS.cardBgOpacity,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.cardBorderOpacity,
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
    lineHeight: 22,
  },
  newsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newsSource: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  newsButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newsButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  navigationSection: {
    marginTop: 32,
    gap: 12,
  },
});
