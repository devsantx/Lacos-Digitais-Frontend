import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import {
  authLogin,
  authRegister,
  authVerify,
  clearAuthToken,
  saveAuthToken,
} from "../services/api";

/**
 * Hook customizado para gerenciar autenticação
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ============================================================
  // Registro
  // ============================================================
  const register = useCallback(async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("🔄 Iniciando registro...");
      const response = await authRegister(username, password);

      if (response.data.success) {
        const { token, user: userData } = response.data;

        // Salvar token
        await saveAuthToken(token);

        // Salvar dados do usuário
        await AsyncStorage.setItem("userData", JSON.stringify(userData));

        setUser(userData);
        console.log("✅ Registro bem-sucedido!");

        return {
          success: true,
          user: userData,
          token,
        };
      }
    } catch (err) {
      console.error(
        "❌ Erro no registro:",
        err.response?.data?.error || err.message
      );
      setError(err.response?.data?.error || "Erro ao registrar");

      return {
        success: false,
        error: err.response?.data?.error || err.message,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============================================================
  // Login
  // ============================================================
  const login = useCallback(async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("🔄 Iniciando login...");
      const response = await authLogin(username, password);

      if (response.data.success) {
        const { token, user: userData } = response.data;

        // Salvar token
        await saveAuthToken(token);

        // Salvar dados do usuário
        await AsyncStorage.setItem("userData", JSON.stringify(userData));

        setUser(userData);
        console.log("✅ Login bem-sucedido!");

        return {
          success: true,
          user: userData,
          token,
        };
      }
    } catch (err) {
      console.error(
        "❌ Erro no login:",
        err.response?.data?.error || err.message
      );
      setError(err.response?.data?.error || "Credenciais inválidas");

      return {
        success: false,
        error: err.response?.data?.error || err.message,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============================================================
  // Verificar autenticação ao iniciar app
  // ============================================================
  const checkAuth = useCallback(async () => {
    setIsLoading(true);

    try {
      const userData = await AsyncStorage.getItem("userData");

      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Verificar se token ainda é válido
        try {
          await authVerify();
          console.log("✅ Sessão válida");
        } catch (err) {
          console.warn("⚠️ Token inválido, fazendo logout");
          await logout();
        }
      }
    } catch (err) {
      console.error("❌ Erro ao verificar auth:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============================================================
  // Logout
  // ============================================================
  const logout = useCallback(async () => {
    try {
      await clearAuthToken();
      setUser(null);
      console.log("👋 Logout realizado");
    } catch (err) {
      console.error("❌ Erro no logout:", err);
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!user,
  };
};
