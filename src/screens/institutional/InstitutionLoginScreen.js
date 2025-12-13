import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";
import { institutionalLogin, saveInstitutionalToken } from "../../services/api";

export default function InstitutionLoginScreen({ navigation }) {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validações
    if (!matricula || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      console.log("🔄 Tentando login institucional...");

      const response = await institutionalLogin(matricula, senha);

      if (response.data.success) {
        const { token, institution } = response.data;

        // Salvar token
        await saveInstitutionalToken(token);

        // Salvar dados da instituição
        await AsyncStorage.setItem(
          "institutionData",
          JSON.stringify(institution)
        );

        console.log("✅ Login bem-sucedido!");

        Alert.alert("Sucesso", `Bem-vindo, ${institution.nome}!`, [
          {
            text: "OK",
            onPress: () => navigation.replace("InstitutionDashboard"),
          },
        ]);
      }
    } catch (error) {
      console.error("❌ Erro no login:", error);

      let errorMessage = "Falha ao fazer login";

      if (error.response?.status === 401) {
        errorMessage =
          error.response.data.error || "Matrícula ou senha incorretos";
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
      <Header showBack={true} backTo="UserSelect" showLogo={true} />

      <View style={styles.content}>
        <Text style={styles.title}>Acesso Institucional</Text>
        <Text style={styles.subtitle}>
          Faça login com sua matrícula e senha institucional
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            📌 Este acesso é exclusivo para instituições parceiras cadastradas.
          </Text>
        </View>

        <View style={styles.form}>
          <FormInput
            label="Matrícula"
            placeholder="20231234"
            value={matricula}
            onChangeText={setMatricula}
            keyboardType="numeric"
            required
          />

          <FormInput
            label="Senha"
            placeholder="••••••••"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            required
          />

          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            variant="primary"
          />

          <Button
            title="Voltar"
            onPress={() => navigation.goBack()}
            variant="outline"
            disabled={loading}
          />
        </View>

        {/* Credenciais de teste */}
        <View style={styles.testCard}>
          <Text style={styles.testTitle}>🧪 Dados de Teste</Text>
          <Text style={styles.testText}>Matrícula: 20231234</Text>
          <Text style={styles.testText}>Senha: teste123</Text>
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
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#BFDBFE",
  },
  infoText: {
    color: COLORS.gray700,
    fontSize: 14,
    lineHeight: 20,
  },
  form: {
    marginTop: 8,
  },
  testCard: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 2,
    borderColor: "#FDE68A",
  },
  testTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.gray900,
    marginBottom: 8,
  },
  testText: {
    fontSize: 13,
    color: COLORS.gray700,
    marginBottom: 4,
  },
});
