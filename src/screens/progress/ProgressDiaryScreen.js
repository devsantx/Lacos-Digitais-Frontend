import React, { useState } from "react";
import {
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

  const moods = [
    { emoji: "😊", label: "Feliz" },
    { emoji: "😐", label: "Neutro" },
    { emoji: "😔", label: "Triste" },
    { emoji: "😰", label: "Ansioso" },
  ];

  const handleSave = () => {
    if (!hours || !selectedMood) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    Alert.alert(
      "Parabéns! 🎉",
      "✅ Entrada salva com sucesso!\n\n🥈 Você desbloqueou a conquista: Persistente",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Header backTo="ProgressDashboard" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Diário de Hoje</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Quantas horas você usou internet hoje?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="6"
              value={hours}
              onChangeText={setHours}
              keyboardType="numeric"
            />
          </View>

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
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>O que te levou a usar tanto/pouco?</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva seus gatilhos..."
              value={triggers}
              onChangeText={setTriggers}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Entrada</Text>
          </TouchableOpacity>
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
    marginBottom: 24,
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
    gap: 12,
  },
  moodButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  moodButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.cardBgOpacity,
  },
  moodEmoji: {
    fontSize: 32,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
