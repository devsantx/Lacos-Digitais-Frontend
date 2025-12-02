import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/common/Card";
import Header from "../components/common/Header"; // Importando o Header component
import { COLORS } from "../constants/colors";

export default function UserSelectScreen({ navigation }) {
  const userTypes = [
    {
      icon: "globe-outline",
      title: "POPULAÇÃO",
      subtitle: "NOTÍCIAS - DICAS - QUIZ",
      screenName: "Population",
      description:
        "Acesse conteúdo informativo e quizzes sobre dependência digital",
    },
    {
      icon: "people-outline",
      title: "FAMILIARES E AMIGOS",
      subtitle: "DICAS PRÁTICAS - MURAL DE APOIO",
      screenName: "Family",
      description:
        "Dicas para ajudar pessoas próximas que enfrentam esse desafio",
    },
    {
      icon: "trending-up-outline",
      title: "MEU PROGRESSO",
      subtitle: "ÁREA PESSOAL E ANÔNIMA",
      screenName: "ProgressWelcome",
      description: "Acompanhe sua jornada de forma privada e segura",
      variant: "primary",
    },
    {
      icon: "business-outline",
      title: "INSTITUIÇÕES",
      subtitle: "MATERIAIS DE APOIO - PARCERIAS",
      screenName: "InstitutionLogin",
      description: "Acesso exclusivo para instituições parceiras",
    },
  ];

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {/* Usando o componente Header ajustado */}
      <Header
        showBack={true}
        backTo="SplashScreen" // Navega para Splashscreen
        showLogo={true} // Mostra a logo Brain.png
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Como podemos te ajudar?</Text>
        <Text style={styles.screenSubtitle}>
          Escolha o seu tipo de usuário abaixo:
        </Text>

        <View style={styles.cardsContainer}>
          {userTypes.map((user, index) => (
            <Card
              key={index}
              icon={user.icon}
              title={user.title}
              subtitle={user.subtitle}
              onPress={() => handleNavigation(user.screenName)}
              variant={user.variant}
            />
          ))}
        </View>

        {/* Seção de Informações Adicionais */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>ℹ️ Sobre Laços Digitais</Text>
          <Text style={styles.infoText}>
            Plataforma dedicada à prevenção, informação e cuidado relacionados à
            dependência digital. Acreditamos na importância de oferecer suporte
            contínuo para uma vida digital mais saudável.
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
    paddingBottom: 32,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
    marginTop: 8, // Adicionei um pouco de espaço após o header
  },
  screenSubtitle: {
    fontSize: 16,
    color: COLORS.gray600,
    marginBottom: 24,
  },
  cardsContainer: {
    marginTop: 8,
  },
  infoSection: {
    marginTop: 40,
    backgroundColor: COLORS.cardBgOpacity,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.cardBorderOpacity,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.gray700,
    lineHeight: 22,
  },
});
