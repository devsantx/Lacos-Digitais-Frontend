import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import getEnvVars from "../config/environment";

const envVars = getEnvVars();

/**
 * Instância do Axios com configurações globais
 */
const api = axios.create({
  baseURL: envVars.apiUrl,
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
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("❌ Erro ao recuperar token:", error);
    }
    return config;
  },
  (error) => {
    console.error("❌ Erro na request:", error);
    return Promise.reject(error);
  }
);

// ============================================================
// INTERCEPTOR: Tratar Respostas e Erros
// ============================================================
api.interceptors.response.use(
  (response) => {
    console.log(
      "✅ Response:",
      response.config.method.toUpperCase(),
      response.config.url
    );
    return response;
  },
  async (error) => {
    const { response } = error;

    if (response?.status === 401) {
      console.warn("⚠️ Token expirado, fazendo logout");
      try {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("userData");
      } catch (e) {
        console.error("Erro ao limpar dados:", e);
      }
      // Poderia navegar para login aqui
    }

    if (response?.status === 503) {
      console.log("⚠️ Servidor iniciando, aguarde...");
    }

    console.error(
      "❌ Erro na response:",
      response?.status,
      response?.data?.error
    );
    return Promise.reject(error);
  }
);

// ============================================================
// FUNÇÕES DE AUTH
// ============================================================

/**
 * Registrar novo usuário anônimo
 */
export const authRegister = (username, password) => {
  console.log("📝 Registrando:", username);
  return api.post("/auth/register", { username, password });
};

/**
 * Fazer login
 */
export const authLogin = (username, password) => {
  console.log("🔐 Fazendo login:", username);
  return api.post("/auth/login", { username, password });
};

/**
 * Verificar token válido
 */
export const authVerify = () => {
  console.log("✔️ Verificando token");
  return api.get("/auth/verify");
};

// ============================================================
// FUNÇÕES DE ARTIGOS
// ============================================================

/**
 * Listar todos os artigos aprovados
 */
export const getArticles = () => {
  console.log("📚 Buscando artigos");
  return api.get("/articles");
};

/**
 * Obter detalhes de um artigo
 */
export const getArticle = (id) => {
  console.log(`📖 Buscando artigo ${id}`);
  return api.get(`/articles/${id}`);
};

// ============================================================
// FUNÇÕES DE QUIZZES
// ============================================================

/**
 * Listar quizzes disponíveis
 */
export const getQuizzes = () => {
  console.log("❓ Buscando quizzes");
  return api.get("/quizzes");
};

/**
 * Submeter resposta de quiz
 */
export const submitQuizResponse = (quizId, responses, score) => {
  console.log(`📤 Submetendo resposta para quiz ${quizId}`);
  return api.post("/quiz-responses", {
    quiz_id: quizId,
    responses,
    score,
    user_type: "anonymous",
  });
};

// ============================================================
// FUNÇÕES DE PROGRESSO (Diário, Metas, etc)
// ============================================================

/**
 * Criar entrada no diário
 */
export const createDiaryEntry = (
  userId,
  date,
  timeOnline,
  mood,
  triggers,
  activities
) => {
  console.log(`📓 Criando entrada no diário para ${date}`);
  return api.post("/diary-entries", {
    user_id: userId,
    date,
    time_online: timeOnline,
    mood,
    triggers,
    activities,
  });
};

/**
 * Obter entradas do diário do usuário
 */
export const getDiaryEntries = (userId) => {
  console.log(`📚 Buscando entradas do diário de ${userId}`);
  return api.get(`/diary-entries/${userId}`);
};

/**
 * Criar meta
 */
export const createGoal = (
  userId,
  title,
  description,
  targetValue,
  frequency,
  startDate,
  endDate
) => {
  console.log(`🎯 Criando meta: ${title}`);
  return api.post("/goals", {
    user_id: userId,
    title,
    description,
    target_value: targetValue,
    frequency,
    start_date: startDate,
    end_date: endDate,
  });
};

/**
 * Obter metas do usuário
 */
export const getUserGoals = (userId) => {
  console.log(`🎯 Buscando metas de ${userId}`);
  return api.get(`/goals/${userId}`);
};

/**
 * Atualizar progresso de meta
 */
export const updateGoal = (goalId, currentValue) => {
  console.log(`📈 Atualizando meta ${goalId}`);
  return api.put(`/goals/${goalId}`, {
    current_value: currentValue,
  });
};

// ============================================================
// FUNÇÕES DE AUTOAVALIAÇÃO
// ============================================================

/**
 * Submeter autoavaliação
 */
export const submitSelfAssessment = (userId, questionnaireType, responses) => {
  console.log(`📋 Submetendo autoavaliação de ${questionnaireType}`);
  return api.post("/self-assessments", {
    user_id: userId,
    assessment_date: new Date().toISOString().split("T")[0],
    questionnaire_type: questionnaireType,
    responses,
  });
};

/**
 * Obter histórico de autoavaliações
 */
export const getUserAssessments = (userId) => {
  console.log(`📊 Buscando autoavaliações de ${userId}`);
  return api.get(`/self-assessments/${userId}`);
};

// ============================================================
// FUNÇÕES DE CONQUISTAS
// ============================================================

/**
 * Obter conquistas do usuário
 */
export const getUserAchievements = (userId) => {
  console.log(`🏆 Buscando conquistas de ${userId}`);
  return api.get(`/user-achievements/${userId}`);
};

/**
 * Verificar e desbloquear conquistas
 */
export const checkAndUnlockAchievements = (userId) => {
  console.log(`🔓 Verificando novas conquistas para ${userId}`);
  return api.post("/user-achievements/check", {
    user_id: userId,
  });
};

// ============================================================
// FUNÇÕES DE CONTATOS
// ============================================================

/**
 * Obter rede de apoio (contatos)
 */
export const getContacts = () => {
  console.log("📞 Buscando contatos de apoio");
  return api.get("/contacts");
};

// ============================================================
// FUNÇÃO DE TESTE
// ============================================================

/**
 * Teste básico de conexão com API
 */
export const testConnection = () => {
  console.log("🔌 Testando conexão com API");
  return api.get("/test");
};

/**
 * Health check do servidor
 */
export const healthCheck = () => {
  console.log("💚 Verificando saúde do servidor");
  return api.get("/health");
};

// ============================================================
// FUNÇÃO AUXILIAR: Salvar token
// ============================================================

export const saveAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
    console.log("💾 Token salvo localmente");
  } catch (error) {
    console.error("❌ Erro ao salvar token:", error);
  }
};

/**
 * Recuperar token
 */
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (error) {
    console.error("❌ Erro ao recuperar token:", error);
    return null;
  }
};

/**
 * Remover token (logout)
 */
export const clearAuthToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userData");
    console.log("🗑️ Token removido");
  } catch (error) {
    console.error("❌ Erro ao remover token:", error);
  }
};

export default api;
