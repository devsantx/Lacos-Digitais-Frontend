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
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";
import { getContacts } from "../../services/api";

// ============================================================
// Componente: Card de Dica
// ============================================================
const TipCard = ({ title, source, url }) => {
  const handlePress = () => {
    if (url) {
      // Aqui você abriria o link no navegador
      Alert.alert("Link", `Você seria redirecionado para: ${url}`);
    } else {
      Alert.alert("Aviso", "Link será configurado em breve");
    }
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
    Alert.alert("Telefonar", `Ligar para: ${phone}`);
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
// Screen Principal: FamilyScreen
// ============================================================
export default function FamilyScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================================
  // Carregar contatos ao inicializar
  // ============================================================
  useEffect(() => {
    const loadContacts = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("📞 Carregando contatos de apoio...");
        const response = await getContacts();

        if (response.data.success) {
          setContacts(response.data.data || []);
          console.log("✅ Contatos carregados:", response.data.data?.length);
        }
      } catch (err) {
        console.error("❌ Erro ao carregar contatos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando conteúdo...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Erro ao carregar</Text>
          <Text style={styles.errorDetails}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ============================================================
            SEÇÃO: DICAS PRÁTICAS
            ============================================================ */}
        <Text style={styles.sectionTitle}>DICAS PRÁTICAS</Text>

        <TipCard
          title="9 dicas de combate à dependência virtual | Internet"
          source="TECMUNDO"
          url="https://www.tecmundo.com.br"
        />

        <TipCard
          title="Detox digital: 8 dicas para reduzir o uso excessivo de telas"
          source="CNN | BRASIL"
          url="https://www.cnnbrasil.com.br"
        />

        <TipCard
          title="Como ajudar alguém com vício em internet"
          source="PSICÓLOGO ONLINE"
          url="https://www.psicologoonline.com.br"
        />

        <TipCard
          title="Guia para pais: Criança e dependência digital"
          source="MINISTÉRIO DA SAÚDE"
          url="https://saude.gov.br"
        />

        {/* ============================================================
            SEÇÃO: REDE DE APOIO
            ============================================================ */}
        <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          REDE DE APOIO
        </Text>

        {contacts.length === 0 ? (
          <View style={styles.muralCard}>
            <View style={styles.muralIcon}>
              <Ionicons
                name="chatbubbles-outline"
                size={48}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.muralText}>
              Nenhum contato de apoio disponível no momento. Tente recarregar a
              página.
            </Text>
          </View>
        ) : (
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              name={contact.institution_name}
              phone={contact.phone || "Sem telefone"}
              description={contact.description}
            />
          ))
        )}

        {/* ============================================================
            SEÇÃO: MURAL DE APOIO (Placeholder)
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
            Estamos organizando grupos de apoio para familiares e amigos. A
            programação será divulgada aqui em breve!
          </Text>
          <View style={styles.muralFeatures}>
            <Text style={styles.muralFeature}>✅ Grupos de apoio</Text>
            <Text style={styles.muralFeature}>
              ✅ Atendimento com psicólogo
            </Text>
            <Text style={styles.muralFeature}>✅ Conversas entre pares</Text>
          </View>
        </View>

        {/* ============================================================
            BOTÃO: Ver todos os contatos
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
  // ============================================================
  // Containers principais
  // ============================================================
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
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // ============================================================
  // Título de seção
  // ============================================================
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
  },
  sectionTitleSpaced: {
    marginTop: 32,
  },

  // ============================================================
  // Card de dica
  // ============================================================
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
    lineHeight: 22,
  },
  tipFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tipSource: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  tipButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tipButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },

  // ============================================================
  // Card de contato
  // ============================================================
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
  contactIcon: {
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.gray900,
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "600",
  },
  contactDescription: {
    fontSize: 13,
    color: COLORS.gray600,
    lineHeight: 20,
  },

  // ============================================================
  // Mural de apoio
  // ============================================================
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
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  muralTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  muralText: {
    fontSize: 14,
    color: COLORS.gray700,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  muralFeatures: {
    width: "100%",
  },
  muralFeature: {
    fontSize: 13,
    color: COLORS.gray700,
    marginBottom: 8,
    marginLeft: 16,
  },

  // ============================================================
  // Botões
  // ============================================================
  contactsButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  backButton: {
    backgroundColor: COLORS.cardBg,
  },
  contactsButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  // ============================================================
  // Textos de carregamento e erro
  // ============================================================
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.gray600,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.error,
    textAlign: "center",
  },
  errorDetails: {
    fontSize: 14,
    color: COLORS.gray600,
    textAlign: "center",
    marginTop: 8,
  },
});
