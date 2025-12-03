import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import Header from "../../components/common/Header";
import { COLORS } from "../../constants/colors";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { validators } from "../../utils/validators";

export default function ProgressAuthScreen({ navigation, route }) {
  const mode = route.params?.mode || "login";
  const [showPassword, setShowPassword] = useState(false);
  const { register: apiRegister, login: apiLogin } = useAuth();

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  };

  const validateForm = (values, { setFieldError }) => {
    let hasError = false;

    const usernameError =
      validators.required(values.username, "Username") ||
      validators.username(values.username);
    if (usernameError) {
      setFieldError("username", usernameError);
      hasError = true;
    }

    const passwordError =
      validators.required(values.password, "Senha") ||
      validators.minLength(values.password, 6, "Senha");
    if (passwordError) {
      setFieldError("password", passwordError);
      hasError = true;
    }

    if (mode === "register") {
      const matchError = validators.matchPassword(
        values.password,
        values.confirmPassword
      );
      if (matchError) {
        setFieldError("confirmPassword", matchError);
        hasError = true;
      }

      if (!values.agreed) {
        setFieldError("agreed", "Você precisa concordar com os termos");
        hasError = true;
      }
    }

    return !hasError;
  };

  const { values, errors, loading, handleChange, resetForm, handleSubmit } =
    useForm(initialValues, async (values) => {
      // Validar formulário
      const isValid = validateForm(values, {
        setFieldError: (field, error) => {
          // Este setFieldError será chamado de dentro do handleSubmit
        },
      });

      if (!isValid) {
        throw new Error("Validação falhou");
      }

      try {
        let result;

        if (mode === "login") {
          console.log("🔐 Tentando login...");
          result = await apiLogin(values.username, values.password);
        } else {
          console.log("📝 Tentando registrar...");
          result = await apiRegister(values.username, values.password);
        }

        if (result.success) {
          Alert.alert(
            "Sucesso! 🎉",
            mode === "login"
              ? "Bem-vindo de volta!"
              : "Conta criada com sucesso!",
            [
              {
                text: "OK",
                onPress: () => {
                  resetForm();
                  navigation.navigate("ProgressDashboard");
                },
              },
            ]
          );
        } else {
          Alert.alert("Erro", result.error || "Falha na autenticação");
        }
      } catch (error) {
        console.error("❌ Erro:", error);
        Alert.alert("Erro", error.message || "Algo deu errado");
      }
    });

  return (
    <View style={styles.container}>
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
        <Text style={styles.title}>
          {mode === "login" ? "Entrar" : "Criar Conta"}
        </Text>
        <Text style={styles.subtitle}>
          {mode === "login"
            ? "Acesse sua área pessoal"
            : "Sua privacidade é garantida. Não coletamos dados pessoais."}
        </Text>

        <View style={styles.form}>
          <FormInput
            label="Username"
            placeholder="usuario123"
            value={values.username}
            onChangeText={(v) => handleChange("username", v)}
            error={errors.username}
            required
          />

          <FormInput
            label="Senha"
            placeholder="••••••••"
            value={values.password}
            onChangeText={(v) => handleChange("password", v)}
            secureTextEntry={!showPassword}
            error={errors.password}
            required
          />

          {mode === "register" && (
            <FormInput
              label="Confirmar Senha"
              placeholder="••••••••"
              value={values.confirmPassword}
              onChangeText={(v) => handleChange("confirmPassword", v)}
              secureTextEntry={!showPassword}
              error={errors.confirmPassword}
              required
            />
          )}

          {mode === "register" && (
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => handleChange("agreed", !values.agreed)}
            >
              <View
                style={[
                  styles.checkbox,
                  values.agreed && styles.checkboxChecked,
                ]}
              >
                {values.agreed && <Text style={styles.checkboxText}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                Entendo que meus dados são{" "}
                <Text style={styles.bold}>totalmente anônimos</Text> e que posso
                deletar minha conta a qualquer momento.
              </Text>
            </TouchableOpacity>
          )}
          {errors.agreed && (
            <Text style={styles.errorText}>{errors.agreed}</Text>
          )}

          <Button
            title={mode === "login" ? "Entrar" : "Criar Conta"}
            onPress={() => handleSubmit()}
            loading={loading}
            variant="secondary"
          />

          <Button
            title="Voltar"
            onPress={() => navigation.goBack()}
            variant="outline"
          />

          {mode === "login" ? (
            <TouchableOpacity
              onPress={() =>
                navigation.replace("ProgressAuthScreen", { mode: "register" })
              }
            >
              <Text style={styles.linkText}>
                Não tem conta?{" "}
                <Text style={styles.linkTextBold}>Criar uma agora</Text>
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.replace("ProgressAuthScreen", { mode: "login" })
              }
            >
              <Text style={styles.linkText}>
                Já tem conta?{" "}
                <Text style={styles.linkTextBold}>Faça login</Text>
              </Text>
            </TouchableOpacity>
          )}
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
    marginBottom: 32,
  },
  form: {
    marginTop: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
    backgroundColor: "#EFF6FF",
    borderWidth: 2,
    borderColor: "#BFDBFE",
    borderRadius: 12,
    padding: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  checkboxText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray700,
    lineHeight: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginBottom: 12,
    fontWeight: "500",
  },
  linkText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
    color: COLORS.gray600,
  },
  linkTextBold: {
    fontWeight: "bold",
    color: COLORS.progressPrimary,
  },
});
