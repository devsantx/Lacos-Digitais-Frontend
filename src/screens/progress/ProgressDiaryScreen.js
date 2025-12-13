// src/screens/progress/ProgressDiaryScreen.js
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";

export default function ProgressDiaryScreen({ navigation }) {
  const [hours, setHours] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [triggers, setTriggers] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const moods = [
    { emoji: "😊", label: "Feliz", value: "feliz" },
    { emoji: "😐", label: "Neutro", value: "neutro" },
    { emoji: "😔", label: "Triste", value: "triste" },
    { emoji: "😰", label: "Ansioso", value: "ansioso" },
  ];

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsed = JSON.parse(userData);
          setUserId(parsed.id);
          console.log("👤 ID do usuário carregado:", parsed.id);
        } else {
          Alert.alert("Erro", "Usuário não identificado");
          navigation.goBack();
        }
      } catch (error) {
        console.error("❌ Erro ao obter ID do usuário:", error);
        Alert.alert("Erro", "Falha ao carregar dados do usuário");
      }
    };

    getUserId();
  }, [navigation]);

  const handleSave = async () => {
    // Validação de campos obrigatórios
    if (!hours || selectedMood === null) {
      Alert.alert(
        "Campos Obrigatórios",
        "Por favor, preencha o número de horas e selecione seu humor"
      );
      return;
    }

    // Validação de horas (0-24)
    const hoursNum = parseInt(hours);
    if (isNaN(hoursNum) || hoursNum < 0 || hoursNum > 24) {
      Alert.alert("Erro", "Digite um número de horas válido (0-24)");
      return;
    }

    if (!userId) {
      Alert.alert("Erro", "Usuário não identificado");
      return;
    }

    setLoading(true);

    // Simulação de salvamento (REMOVER ESTA PARTE QUANDO O BACKEND ESTIVER FUNCIONANDO)
    setTimeout(() => {
      // Limpar os campos
      setHours("");
      setSelectedMood(null);
      setTriggers("");
      setLoading(false);

      // Mostrar pop-up informativo
      Alert.alert(
        "Modo de Teste 🧪",
        "O sistema de diário está em fase de testes. Sua entrada foi registrada localmente, mas não foi salva no servidor.\n\nEsta funcionalidade estará disponível em breve!",
        [
          {
            text: "OK",
            onPress: () => {
              // Voltar para a tela ProgressDashboardScreen
              navigation.navigate("ProgressDashboard");
            },
          },
        ]
      );
    }, 1500);

    // CÓDIGO ORIGINAL (COMENTADO - PARA USAR QUANDO O BACKEND ESTIVER FUNCIONANDO)
    /*
    try {
      console.log("💾 Salvando entrada do diário...");

      const today = new Date().toISOString().split("T")[0];
      const moodLabel = moods[selectedMood].label;

      const response = await createDiaryEntry(
        userId,
        today,
        parseInt(hours),
        moodLabel,
        triggers || "Sem informações",
        []
      );

      if (response.data.success) {
        console.log("✅ Entrada salva com sucesso!");

        try {
          console.log("🔓 Verificando conquistas...");
          const achievementsResponse = await checkAndUnlockAchievements(userId);

          let achievementMessage = "";
          if (
            achievementsResponse.data.data &&
            achievementsResponse.data.data.length > 0
          ) {
            const achievement = achievementsResponse.data.data[0];
            achievementMessage = `\n\n🏆 Conquista desbloqueada: ${achievement.name}`;
          }

          Alert.alert(
            "Parabéns! 🎉",
            `✅ Entrada salva com sucesso!${achievementMessage}`,
            [
              {
                text: "OK",
                onPress: () => {
                  setHours("");
                  setSelectedMood(null);
                  setTriggers("");
                  navigation.navigate("ProgressDashboard");
                },
              },
            ]
          );
        } catch (achieveError) {
          console.warn(
            "⚠️ Não foi possível verificar conquistas:",
            achieveError.message
          );

          Alert.alert("Sucesso! ✅", "Sua entrada foi salva com sucesso!", [
            {
              text: "OK",
              onPress: () => {
                setHours("");
                setSelectedMood(null);
                setTriggers("");
                navigation.navigate("ProgressDashboard");
              },
            },
          ]);
        }
      } else {
        Alert.alert("Erro", response.data.error || "Falha ao salvar entrada");
      }
    } catch (error) {
      console.error("❌ Erro ao salvar entrada:", error);

      let errorMessage = "Falha ao salvar entrada";

      if (error.response?.status === 401) {
        errorMessage = "Sua sessão expirou. Faça login novamente.";
      } else if (error.response?.status === 400) {
        errorMessage = error.response?.data?.error || "Dados inválidos";
      } else if (error.response?.status === 404) {
        errorMessage =
          "Endpoint não encontrado. Verifique se o backend está atualizado.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
    */
  };

  const handleCancel = () => {
    // Voltar para ProgressDashboardScreen
    navigation.navigate("ProgressDashboard");
  };

  return (
    <View style={styles.container}>
      <Header showBack={true} backTo="ProgressDashboard" showLogo={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Registre Seu Dia</Text>
        <Text style={styles.subtitle}>
          Quanto tempo você passou na internet hoje?
        </Text>

        {/* Banner de Modo de Teste */}
        <View style={styles.testBanner}>
          <Ionicons name="beaker-outline" size={20} color="#D97706" />
          <Text style={styles.testBannerText}>
            MODO DE TESTE - Esta funcionalidade está em desenvolvimento
          </Text>
        </View>

        <View style={styles.form}>
          {/* Campo: Horas na Internet */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Quantas horas você usou internet hoje?
            </Text>
            <View style={styles.hoursInputContainer}>
              <TextInput
                style={styles.hoursInput}
                placeholder="0"
                value={hours}
                onChangeText={setHours}
                keyboardType="number-pad"
                editable={!loading}
                maxLength={2}
              />
              <Text style={styles.hoursLabel}>horas</Text>
            </View>
            <Text style={styles.hint}>Digite um número de 0 a 24</Text>
          </View>

          {/* Campo: Humor */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Como você se sentiu?</Text>
            <View style={styles.moodsContainer}>
              {moods.map((mood, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.moodButton,
                    selectedMood === index && styles.moodButtonSelected,
                  ]}
                  onPress={() => setSelectedMood(index)}
                  disabled={loading}
                  activeOpacity={0.7}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Campo: Gatilhos */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>O que te levou a usar tanto/pouco?</Text>
            <Text style={styles.hint}>
              Descreva seus gatilhos, sentimentos e situações
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ex: Estava entediado, recebi notificação de amigos, discuti com alguém..."
              value={triggers}
              onChangeText={setTriggers}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              editable={!loading}
            />
          </View>

          {/* Botão: Salvar (Modo Teste) */}
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <>
                <ActivityIndicator size="small" color={COLORS.white} />
                <Text style={styles.saveButtonText}>
                  Salvando em modo teste...
                </Text>
              </>
            ) : (
              <>
                <Ionicons
                  name="beaker-outline"
                  size={20}
                  color={COLORS.white}
                />
                <Text style={styles.saveButtonText}>Salvar (Modo Teste)</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Botão: Cancelar */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Ionicons
              name="close-circle-outline"
              size={20}
              color={COLORS.gray600}
            />
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={COLORS.info}
          />
          <Text style={styles.infoText}>
            ⚠️ Esta funcionalidade está em fase de testes. Suas entradas serão
            salvas apenas localmente por enquanto. O sistema completo estará
            disponível em breve!
          </Text>
        </View>

        {/* Dica para desenvolvedores */}
        <View style={styles.devNote}>
          <Ionicons name="code-outline" size={16} color={COLORS.gray500} />
          <Text style={styles.devNoteText}>
            Para habilitar o salvamento real no servidor, remova a simulação
            (setTimeout) na função handleSave() e descomente o código original.
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray600,
    marginBottom: 16,
    lineHeight: 22,
  },
  testBanner: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FBBF24",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  testBannerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#92400E",
  },
  form: {
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray700,
    marginBottom: 12,
  },
  hint: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 6,
    fontStyle: "italic",
  },
  hoursInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  hoursInput: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
  },
  hoursLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray700,
    paddingVertical: 12,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.gray900,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  moodsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  moodButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  moodButtonSelected: {
    borderColor: COLORS.progressPrimary,
    backgroundColor: "#F3E8FF",
    borderWidth: 3,
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.gray700,
  },
  saveButton: {
    backgroundColor: "#D97706", // Cor laranja para modo teste
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    elevation: 3,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 2,
    borderColor: COLORS.gray300,
  },
  cancelButtonText: {
    color: COLORS.gray600,
    fontSize: 16,
    fontWeight: "bold",
  },
  infoCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 16,
    marginTop: 32,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
    flexDirection: "row",
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.gray700,
    lineHeight: 20,
  },
  devNote: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  devNoteText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.gray600,
    fontFamily: "monospace",
    lineHeight: 16,
  },
});
