import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";

export default function InstitutionLoginScreen({ navigation }) {
  const [registration, setRegistration] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!registration || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      // Simular login
      setTimeout(() => {
        Alert.alert("Sucesso", "Bem-vindo à instituição!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("InstitutionDashboard"),
          },
        ]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      Alert.alert("Erro", "Falha ao fazer login");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Text style={styles.title}>Seja Bem-Vindo</Text>
        <Text style={styles.subtitle}>
          Acesso somente para pessoas autorizadas.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Faça o login com sua matrícula e senha da sua instituição de ensino!
          </Text>
        </View>

        <View style={styles.form}>
          <FormInput
            label="Matrícula:"
            placeholder="20231234"
            value={registration}
            onChangeText={setRegistration}
            keyboardType="numeric"
            required
          />

          <FormInput
            label="Senha:"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            required
          />

          <Button
            title="Entrar!"
            onPress={handleLogin}
            loading={loading}
            variant="primary"
          />

          <Button
            title="Voltar"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
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
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  infoText: {
    color: COLORS.white,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  form: {
    marginTop: 8,
  },
});
