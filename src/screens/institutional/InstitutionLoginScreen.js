// src/screens/institutional/InstitutionLoginScreen.js - VERSÃO 100% MOCK
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormInput from "../../components/common/FormInput";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";

export default function InstitutionLoginScreen({ navigation }) {
  const [matricula, setMatricula] = useState("20231234");
  const [senha, setSenha] = useState("teste123");
  const [loading, setLoading] = useState(false);

  const handleMockLogin = async () => {
    if (!matricula || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      console.log("🧪 Executando login MOCK...");

      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Dados mock da instituição
      const mockInstitution = {
        id: 1,
        nome: "UNINASSAU - Instituição de Teste",
        matricula: matricula,
        email: "teste@uninassau.edu.br",
        telefone: "(81) 99999-9999",
        ativo: true,
      };

      // Salvar no AsyncStorage
      await AsyncStorage.setItem(
        "institutionData",
        JSON.stringify(mockInstitution)
      );
      await AsyncStorage.setItem("institutionToken", "mock-token-12345");
      await AsyncStorage.setItem("institutionMode", "mock");

      console.log("✅ Login mock concluído!");

      // Navegar diretamente para o dashboard
      navigation.replace("InstitutionDashboard");
    } catch (error) {
      console.error("❌ Erro no login mock:", error);
      Alert.alert("Erro", "Falha no login simulado");
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
          Modo de Desenvolvimento (100% Frontend)
        </Text>

        {/* Banner informativo */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>🧪 SISTEMA EM MODO DE TESTE</Text>
          <Text style={styles.infoText}>
            Todas as funcionalidades rodam localmente no seu dispositivo.
            Nenhuma conexão com backend é necessária.
          </Text>
        </View>

        <View style={styles.form}>
          <FormInput
            label="Matrícula (qualquer valor funciona)"
            placeholder="Ex: 20231234"
            value={matricula}
            onChangeText={setMatricula}
            keyboardType="numeric"
            editable={!loading}
          />

          <FormInput
            label="Senha (qualquer valor funciona)"
            placeholder="Ex: teste123"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            editable={!loading}
          />

          {/* Botão de login */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.buttonDisabled]}
            onPress={handleMockLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <ActivityIndicator size="small" color={COLORS.white} />
                <Text style={styles.loginButtonText}> Processando...</Text>
              </>
            ) : (
              <Text style={styles.loginButtonText}>Entrar no Modo Teste</Text>
            )}
          </TouchableOpacity>

          {/* Botão de acesso rápido (com credenciais pré-preenchidas) */}
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => {
              setMatricula("20231234");
              setSenha("teste123");
            }}
          >
            <Text style={styles.quickButtonText}>
              🔄 Usar Credenciais de Teste
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.backButton, loading && styles.buttonDisabled]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.backButtonText}>← Voltar para Seleção</Text>
          </TouchableOpacity>
        </View>

        {/* Instruções */}
        <View style={styles.instructions}>
          <Text style={styles.sectionTitle}>Como funciona:</Text>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>
              Preencha qualquer matrícula/senha (ou use o botão acima)
            </Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>
              Clique em "Entrar no Modo Teste"
            </Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>
              Acesse todas as funcionalidades localmente
            </Text>
          </View>

          <View style={styles.note}>
            <Text style={styles.noteText}>
              💡 <Text style={styles.noteBold}>Nota:</Text> Nenhum dado é
              enviado para servidores externos. Todo o sistema funciona no seu
              dispositivo.
            </Text>
          </View>
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
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray600,
    marginBottom: 24,
    textAlign: "center",
  },
  infoBanner: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#FBBF24",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#92400E",
    marginBottom: 8,
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#92400E",
    textAlign: "center",
    lineHeight: 20,
  },
  form: {
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
    elevation: 3,
  },
  quickButton: {
    backgroundColor: "#E0F2FE",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#7DD3FC",
  },
  backButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.gray300,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  quickButtonText: {
    color: "#0C4A6E",
    fontSize: 14,
    fontWeight: "600",
  },
  backButtonText: {
    color: COLORS.gray700,
    fontSize: 14,
    fontWeight: "600",
  },
  instructions: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: "#E2E8F0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    color: COLORS.white,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "bold",
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray700,
    lineHeight: 20,
  },
  note: {
    backgroundColor: "#F0F9FF",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#0EA5E9",
  },
  noteText: {
    fontSize: 13,
    color: "#0369A1",
    lineHeight: 18,
  },
  noteBold: {
    fontWeight: "bold",
  },
});
