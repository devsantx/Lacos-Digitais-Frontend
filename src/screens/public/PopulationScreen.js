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

// Componente separado para garantir que seja re-renderizado
const NewsCard = React.memo(({ title, source, url }) => {
  const handlePress = () => {
    console.log("Tentando abrir:", url);

    Alert.alert(
      "Abrir Link Externo",
      "Você será redirecionado para uma página externa no navegador. Deseja continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => console.log("Cancelado pelo usuário"),
        },
        {
          text: "Abrir",
          onPress: () => {
            console.log("Abrindo link:", url);
            if (url) {
              Linking.openURL(url).catch((err) => {
                console.error("Erro ao abrir:", err);
                Alert.alert(
                  "Erro",
                  "Não foi possível abrir o link. Verifique sua conexão.",
                  [{ text: "OK" }]
                );
              });
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.newsCard}>
      <Text style={styles.newsTitle}>{title}</Text>
      <View style={styles.newsFooter}>
        <Text style={styles.newsSource}>{source}</Text>
        <TouchableOpacity
          style={styles.newsButton}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text style={styles.newsButtonText}>CONFIRA AQUI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default function PopulationScreen({ navigation }) {
  console.log("PopulationScreen renderizado");

  const newsItems = [
    {
      id: 1,
      title:
        "Vício em internet pode afetar comportamento e desenvolvimento de adolescentes.",
      source: "CNN | BRASIL",
      url: "https://www.cnnbrasil.com.br/saude/vicio-em-internet-pode-afetar-comportamento-e-desenvolvimento-de-adolescentes/",
    },
    {
      id: 2,
      title: "Todos os adolescentes são viciados em redes sociais?",
      source: "G1 | GLOBO",
      url: "https://g1.globo.com/educacao/noticia/2024/11/28/todos-os-adolescentes-sao-viciados-em-redes-sociais.ghtml",
    },
  ];

  const quizItems = [
    {
      id: 3,
      title:
        "RESPONDA ESSE QUIZ E VEJA SE VOCÊ SOFRE COM DEPENDÊNCIA DE INTERNET.",
      source: "ALUNOS ETVC",
      url: "https://pt.quizur.com/quiz/dependencia-digital-QZzD",
    },
    {
      id: 4,
      title: "RESPONDA ESSE QUIZ E VEJA SE VOCÊ CONHECE ALGUÉM QUE TENHA DI.",
      source: "Giulia Jacometo",
      url: "https://pt.quizur.com/quiz/quanto-voce-e-dependente-da-internet-1mBjq",
    },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER COM LOGO - igual ao UserSelectScreen */}
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
        <Text style={styles.sectionTitle}>NOTÍCIAS</Text>

        {newsItems.map((news) => (
          <NewsCard
            key={news.id}
            title={news.title}
            source={news.source}
            url={news.url}
          />
        ))}

        <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          QUIZ
        </Text>

        {quizItems.map((quiz) => (
          <NewsCard
            key={quiz.id}
            title={quiz.title}
            source={quiz.source}
            url={quiz.url}
          />
        ))}

        <View style={styles.navigationSection}>
          <Button
            title="VER ARTIGOS CIENTÍFICOS"
            onPress={() => navigation.navigate("Articles")}
            variant="primary"
          />

          <Button
            title="VOLTAR"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>⚠️ Atenção</Text>
          <Text style={styles.infoText}>
            Ao clicar nos botões acima, você verá um alerta antes de ser
            redirecionado para páginas externas.
          </Text>
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
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitleSpaced: {
    marginTop: 32,
  },
  newsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.gray800,
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
    fontStyle: "italic",
    flex: 1,
  },
  newsButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 12,
  },
  newsButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  navigationSection: {
    marginTop: 32,
    gap: 16,
  },
  infoBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#FFF3E0",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFB74D",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F57C00",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#5D4037",
    lineHeight: 20,
  },
});
