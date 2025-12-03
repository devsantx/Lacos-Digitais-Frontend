import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
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

// ============================================================
// Lista Fixa de Contatos Base
// ============================================================
const FIXED_CONTACTS = [
  {
    id: 1,
    institution_name: "Centro de Atenção Psicossocial (CAPS)",
    phone: "(81) 3123-4567",
    description: "Atendimento público especializado em saúde mental.",
  },
  {
    id: 2,
    institution_name: "Clínica de Psicologia — UNINASSAU",
    phone: "(81) 3234-5678",
    description:
      "Atendimento psicológico acessível realizado por profissionais e residentes.",
  },
  {
    id: 3,
    institution_name: "CVV — Centro de Valorização da Vida",
    phone: "188",
    description:
      "Apoio emocional e prevenção ao suicídio. Atendimento gratuito 24h.",
  },
];

// ============================================================
// Componente: Card de Dica
// ============================================================
const TipCard = ({ title, source, url }) => {
  const handlePress = () => {
    Linking.openURL(url).catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o link.");
    });
  };

  return (
    <View style={styles.tipCard}>
      <Text style={styles.tipTitle}>{title}</Text>
      <View style={styles.tipFooter}>
        <Text style={styles.tipSource}>{source}</Text>

        <TouchableOpacity style={styles.tipButton} onPress={handlePress}>
          <Text style={styles.tipButtonText}>CONFIRA AQUI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ============================================================
// Componente: Card de Contato
// ============================================================
const ContactCard = ({ name, phone, description }) => {
  const handleCall = () => {
    Linking.openURL(`tel:${phone}`).catch(() =>
      Alert.alert("Erro", "Não foi possível iniciar a ligação.")
    );
  };

  return (
    <TouchableOpacity style={styles.contactCard} onPress={handleCall}>
      <View style={styles.contactHeader}>
        <Ionicons
          name="call-outline"
          size={24}
          color={COLORS.primary}
          style={styles.contactIcon}
        />
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{name}</Text>
          <Text style={styles.contactPhone}>{phone}</Text>
        </View>
      </View>
      {description && (
        <Text style={styles.contactDescription}>{description}</Text>
      )}
    </TouchableOpacity>
  );
};

// ============================================================
// Screen: FamilyScreen
// ============================================================
export default function FamilyScreen({ navigation }) {
  const [contacts] = useState(FIXED_CONTACTS);

  return (
    <View style={styles.container}>
      {/* ✔ Header com botão de voltar */}
      <Header showBack={true} backTo="UserSelect" showLogo={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ============================================================
            SEÇÃO: DICAS PRÁTICAS
        ============================================================ */}
        <Text style={styles.sectionTitle}>DICAS PRÁTICAS</Text>

        {/* 🔵 LINKS JÁ EXISTENTES */}
        <TipCard
          title="9 dicas de combate à dependência virtual"
          source="TECMUNDO"
          url="https://www.tecmundo.com.br/seguranca/290359-dependencia-virtual-9-dicas-combate.htm"
        />

        <TipCard
          title="Detox digital: como reduzir o uso excessivo de telas"
          source="CNN BRASIL"
          url="https://www.cnnbrasil.com.br/saude/detox-digital-como-reduzir-o-uso-excessivo-de-telas/"
        />

        <TipCard
          title="Como ajudar alguém com vício em internet"
          source="PSICÓLOGO ONLINE"
          url="https://blog.psicologiaviva.com.br/como-ajudar-um-dependente-digital/"
        />

        <TipCard
          title="Guia para pais: crianças e dependência digital"
          source="MINISTÉRIO DA SAÚDE"
          url="https://www.gov.br/saude/pt-br/assuntos/noticias/2022/criancas-e-adolescentes-e-o-uso-de-telas"
        />

        {/* 🔵 NOVOS LINKS REAIS QUE VOCÊ PEDIU */}
        <TipCard
          title="Como parar a dependência de internet: guia prático"
          source="BIRCHES HEALTH"
          url="https://bircheshealth.com/resources/stop-internet-addiction"
        />

        <TipCard
          title="Internet Addiction — sinais, causas e orientações"
          source="UNCOVER COUNSELING"
          url="https://uncovercounseling.com/blog/internet-addiction-understanding-the-signs-causes-and-solutions/"
        />

        <TipCard
          title="12 passos para superar a dependência de internet"
          source="DIAMOND REHAB"
          url="https://diamondrehabthailand.com/how-to-overcome-internet-addiction/"
        />

        <TipCard
          title="Internet Addiction — o que é e como lidar"
          source="BETTER HEALTH CHANNEL"
          url="https://www.betterhealth.vic.gov.au/health/healthyliving/internet-addiction"
        />

        {/* ============================================================
            SEÇÃO: REDE DE APOIO
        ============================================================ */}
        <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          REDE DE APOIO
        </Text>

        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            name={contact.institution_name}
            phone={contact.phone}
            description={contact.description}
          />
        ))}

        {/* ============================================================
            SEÇÃO: MURAL DE APOIO
        ============================================================ */}
        <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          MURAL DE APOIO PSICOLÓGICO
        </Text>

        <View style={styles.muralCard}>
          <View style={styles.muralIcon}>
            <Ionicons
              name="hand-left-outline"
              size={48}
              color={COLORS.progressPrimary}
            />
          </View>

          <Text style={styles.muralTitle}>Reuniões em Breve</Text>

          <Text style={styles.muralText}>
            Estamos organizando encontros de apoio para familiares e amigos. A
            programação será divulgada muito em breve!
          </Text>

          <View style={styles.muralFeatures}>
            <Text style={styles.muralFeature}>• Grupos de apoio</Text>
            <Text style={styles.muralFeature}>
              • Atendimento com psicólogos
            </Text>
            <Text style={styles.muralFeature}>• Conversas entre pais</Text>
          </View>
        </View>

        {/* ============================================================
            BOTÃO: Ver Contatos
        ============================================================ */}
        <TouchableOpacity
          style={styles.contactsButton}
          onPress={() => navigation.navigate("Contacts")}
        >
          <Ionicons name="call-outline" size={20} color={COLORS.white} />
          <Text style={styles.contactsButtonText}>VER TODOS OS CONTATOS</Text>
        </TouchableOpacity>

        {/* ============================================================
            BOTÃO: Voltar
        ============================================================ */}
        <TouchableOpacity
          style={[styles.contactsButton, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={20} color={COLORS.white} />
          <Text style={styles.contactsButtonText}>VOLTAR</Text>
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
  scrollView: { flex: 1 },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },

  // Titles
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
  },
  sectionTitleSpaced: { marginTop: 32 },

  // Tip Card
  tipCard: {
    backgroundColor: COLORS.cardBgOpacity,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.cardBorderOpacity,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  tipFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tipSource: { fontSize: 12, color: COLORS.gray600 },
  tipButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tipButtonText: { color: COLORS.white, fontSize: 12, fontWeight: "bold" },

  // Contact Card
  contactCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.cardBorderOpacity,
    elevation: 2,
  },
  contactHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactIcon: { marginRight: 12 },
  contactInfo: { flex: 1 },
  contactName: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.gray900,
    marginBottom: 4,
  },
  contactPhone: { fontSize: 13, color: COLORS.primary, fontWeight: "600" },
  contactDescription: { fontSize: 13, color: COLORS.gray600, lineHeight: 20 },

  // Mural
  muralCard: {
    backgroundColor: COLORS.cardBgOpacity,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.cardBorderOpacity,
    marginBottom: 12,
  },
  muralIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  muralTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },
  muralText: {
    fontSize: 14,
    color: COLORS.gray700,
    textAlign: "center",
    lineHeight: 22,
    marginVertical: 12,
  },
  muralFeatures: { width: "100%" },
  muralFeature: {
    fontSize: 13,
    color: COLORS.gray700,
    marginBottom: 8,
    marginLeft: 16,
  },

  // Buttons
  contactsButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: COLORS.gray700,
  },
  contactsButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
