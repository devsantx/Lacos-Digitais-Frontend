import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";

export default function ProgressLoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    // Simular login
    Alert.alert("Sucesso", "✅ Bem-vindo de volta!", [
      { text: "OK", onPress: () => navigation.navigate("ProgressDashboard") },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header backTo="ProgressWelcome" />

      <View style={styles.content}>
        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>Acesse sua área pessoal</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              placeholder="usuario123"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
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
    marginBottom: 32,
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
    marginBottom: 8,
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
  button: {
    backgroundColor: COLORS.progressPrimary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    paddingVertical: 12,
  },
  backButtonText: {
    color: COLORS.gray600,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
