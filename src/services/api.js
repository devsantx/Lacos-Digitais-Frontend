import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import getEnvVars from "../config/environment";

const env = getEnvVars();

console.log("🌐 API BASE URL:", env.apiUrl);

// Instância do Axios com configurações globais
const api = axios.create({
  baseURL: env.apiUrl, // Agora já termina em /api
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ============================================================
// INTERCEPTOR: Adicionar Token JWT
// ============================================================
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// INTERCEPTOR: Tratar Erros
// ============================================================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    console.error("❌ Erro na response:", response?.status, response?.data);

    // Token inválido ou expirado
    if (response?.status === 401) {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userData");
    }

    return Promise.reject(error);
  }
);

// ============================================================
// FUNÇÕES DE AUTH
// ============================================================
export const authRegister = (username, password) => {
  console.log("📝 Registrando:", username);
  return api.post("/auth/register", { username, password });
};

export const authLogin = (username, password) => {
  console.log("🔐 Login:", username);
  return api.post("/auth/login", { username, password });
};

export const authVerify = () => {
  return api.get("/auth/verify");
};

// ============================================================
// ARTIGOS
// ============================================================
export const getArticles = () => api.get("/articles");
export const getArticle = (id) => api.get(`/articles/${id}`);

// ============================================================
// QUIZZES
// ============================================================
export const getQuizzes = () => api.get("/quizzes");

export const submitQuizResponse = (quizId, responses, score) => {
  return api.post("/quiz-responses", {
    quiz_id: quizId,
    responses,
    score,
    user_type: "anonymous",
  });
};

// ============================================================
// PROGRESSO / DIÁRIO
// ============================================================
export const createDiaryEntry = (
  userId,
  date,
  timeOnline,
  mood,
  triggers,
  activities
) =>
  api.post("/diary-entries", {
    user_id: userId,
    date,
    time_online: timeOnline,
    mood,
    triggers,
    activities,
  });

export const getDiaryEntries = (userId) => api.get(`/diary-entries/${userId}`);

// METAS — Desativado temporariamente
export const createGoal = () => Promise.resolve({ data: { success: true } });
export const getUserGoals = () =>
  Promise.resolve({ data: { success: true, data: [] } });
export const updateGoal = () => Promise.resolve({ data: { success: true } });

// ============================================================
// AUTOAVALIAÇÕES
// ============================================================
export const submitSelfAssessment = (userId, questionnaireType, responses) =>
  api.post("/self-assessments", {
    user_id: userId,
    assessment_date: new Date().toISOString().split("T")[0],
    questionnaire_type: questionnaireType,
    responses,
  });

export const getUserAssessments = (userId) =>
  api.get(`/self-assessments/${userId}`);

// CONQUISTAS — Desativado temporariamente
export const getUserAchievements = () =>
  Promise.resolve({ data: { success: true, data: [] } });

export const checkAndUnlockAchievements = () =>
  Promise.resolve({ data: { success: true } });

// ============================================================
// CONTATOS
// ============================================================
export const getContacts = () => api.get("/contacts");

// ============================================================
// TESTES
// ============================================================
export const testConnection = () => api.get("/test");
export const healthCheck = () => api.get("/health");

// ============================================================
// TOKEN HELPERS
// ============================================================
export const saveAuthToken = async (token) => {
  await AsyncStorage.setItem("authToken", token);
};

export const getAuthToken = async () => await AsyncStorage.getItem("authToken");

export const clearAuthToken = async () => {
  await AsyncStorage.removeItem("authToken");
  await AsyncStorage.removeItem("userData");
};

export default api;

// ============================================================
// FUNÇÕES INSTITUCIONAIS
// Adicione estas funções ao seu arquivo src/services/api.js
// ============================================================

// Login institucional
export const institutionalLogin = (matricula, senha) => {
  console.log("🔐 Login institucional:", matricula);
  return api.post("/institutional/login", { matricula, senha });
};

// ============================================================
// ARTIGOS
// ============================================================

// Criar artigo
export const createInstitutionalArticle = (articleData) => {
  console.log("📝 Criando artigo:", articleData.title);
  return api.post("/institutional/articles", articleData);
};

// Listar artigos da instituição
export const getInstitutionalArticles = (status = null) => {
  const params = status ? { status } : {};
  return api.get("/institutional/articles", { params });
};

// Buscar artigo específico
export const getInstitutionalArticleById = (articleId) => {
  return api.get(`/institutional/articles/${articleId}`);
};

// Atualizar artigo
export const updateInstitutionalArticle = (articleId, articleData) => {
  console.log("✏️ Atualizando artigo:", articleId);
  return api.put(`/institutional/articles/${articleId}`, articleData);
};

// Deletar artigo
export const deleteInstitutionalArticle = (articleId) => {
  console.log("🗑️ Deletando artigo:", articleId);
  return api.delete(`/institutional/articles/${articleId}`);
};

// ============================================================
// ESTATÍSTICAS
// ============================================================

// Buscar estatísticas da instituição
export const getInstitutionalStats = () => {
  return api.get("/institutional/stats");
};

// ============================================================
// ARTIGOS PÚBLICOS (sem auth)
// ============================================================

// Listar artigos aprovados para área pública
export const getPublicInstitutionalArticles = (category = null, limit = 50) => {
  const params = { limit };
  if (category) params.category = category;
  return api.get("/institutional/articles/public", { params });
};

// Incrementar visualização
export const incrementArticleView = (articleId) => {
  return api.post(`/institutional/articles/${articleId}/view`);
};

// ============================================================
// TOKEN HELPERS INSTITUCIONAIS
// ============================================================

export const saveInstitutionalToken = async (token) => {
  await AsyncStorage.setItem("institutionToken", token);
};

export const getInstitutionalToken = async () => {
  return await AsyncStorage.getItem("institutionToken");
};

export const clearInstitutionalToken = async () => {
  await AsyncStorage.removeItem("institutionToken");
  await AsyncStorage.removeItem("institutionData");
};
