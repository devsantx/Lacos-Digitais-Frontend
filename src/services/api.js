import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// ============================================================================
// 🔥 ATENÇÃO: SUBSTITUA ESTA URL PELA URL DO SEU RENDER
// ============================================================================
// Depois de fazer o deploy no Render, você vai receber uma URL tipo:
// https://lacos-digitais-api.onrender.com
//
// COLE ELA AQUI EM BAIXO (mantenha o /api no final):
const API_URL = "https://lacos-digitais-api.onrender.com";
// ============================================================================

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 segundos (Render free tier pode demorar)
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token JWT em todas as requisições
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erro ao recuperar token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Se token expirou (401), fazer logout
    if (error.response?.status === 401) {
      try {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("userData");
      } catch (e) {
        console.error("Erro ao limpar dados:", e);
      }
    }

    // Se servidor está dormindo (503), tentar novamente
    if (error.response?.status === 503) {
      console.log("Servidor iniciando, aguarde...");
    }

    return Promise.reject(error);
  }
);

// ============================================================================
// FUNÇÕES DA API - PRONTAS PARA USAR
// ============================================================================

// AUTH - Autenticação
export const register = (username, password) =>
  api.post("/auth/register", { username, password });

export const login = (username, password) =>
  api.post("/auth/login", { username, password });

export const verifyToken = () => api.get("/auth/verify");

// ARTICLES - Artigos
export const getArticles = () => api.get("/articles");

export const getArticle = (id) => api.get(`/articles/${id}`);

// QUIZZES - Questionários
export const getQuizzes = () => api.get("/quizzes");

// ============================================================================

export default api;
