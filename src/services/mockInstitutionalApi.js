// src/services/mockInstitutionalApi.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// Simular um atraso de rede
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Dados mock da instituição
const mockInstitution = {
  id: 1,
  nome: "UNINASSAU - Instituição de Teste",
  matricula: "20231234",
  email: "teste@uninassau.edu.br",
  telefone: "(81) 99999-9999",
  endereco: "Av. Guararapes, 123 - Recife, PE",
  ativo: true,
  created_at: "2024-01-01T00:00:00.000Z",
};

// Artigos mock
const mockArticles = [
  {
    id: 1,
    title: "Dependência de Internet em Adolescentes: Um Estudo Longitudinal",
    authors: "Dra. Maria Silva, Dr. João Santos, Prof. Carlos Oliveira",
    summary:
      "Estudo de 2 anos analisando o impacto do uso excessivo de internet no desenvolvimento cognitivo e social de adolescentes entre 13-18 anos.",
    category: "pesquisa",
    url: "https://exemplo.com/artigo1.pdf",
    keywords: "dependência digital, adolescentes, saúde mental",
    status: "approved",
    views: 1245,
    created_at: "2024-01-15T10:30:00.000Z",
    rejection_reason: null,
  },
  {
    id: 2,
    title: "Estratégias de Prevenção na Escola",
    authors: "Prof. Ana Costa, Dra. Beatriz Lima",
    summary:
      "Abordagens pedagógicas para prevenir a dependência digital em ambiente escolar com foco em educação digital.",
    category: "prevencao",
    url: "https://exemplo.com/artigo2.pdf",
    keywords: "prevenção, escola, educação digital",
    status: "pending",
    views: 0,
    created_at: "2024-01-20T14:15:00.000Z",
    rejection_reason: null,
  },
  {
    id: 3,
    title: "Terapia Cognitivo-Comportamental para Dependência Digital",
    authors: "Dr. Pedro Almeida, Dra. Fernanda Rodrigues",
    summary:
      "Aplicação de técnicas de TCC no tratamento de casos graves de dependência digital com resultados promissores.",
    category: "tratamento",
    url: "https://exemplo.com/artigo3.pdf",
    keywords: "TCC, tratamento, terapia",
    status: "rejected",
    views: 320,
    created_at: "2024-01-10T09:45:00.000Z",
    rejection_reason: "Necessita de aprovação do comitê de ética",
  },
];

// Estatísticas mock
const mockStats = {
  overview: {
    totalArticles: 12,
    totalViews: 3450,
    avgViewsPerArticle: 287,
  },
  articlesByCategory: [
    { category: "pesquisa", count: 5, views: 1200 },
    { category: "prevencao", count: 4, views: 1500 },
    { category: "tratamento", count: 3, views: 750 },
  ],
  topArticles: [
    {
      id: 1,
      title: "Dependência de Internet em Adolescentes",
      category: "pesquisa",
      views: 800,
    },
    {
      id: 2,
      title: "Estratégias de Prevenção",
      category: "prevencao",
      views: 500,
    },
    { id: 3, title: "Terapias Cognitivas", category: "tratamento", views: 300 },
  ],
  monthlyViews: [
    { month: "Out", views: "400" },
    { month: "Nov", views: "650" },
    { month: "Dez", views: "800" },
  ],
};

// Serviço de API Mock
const mockInstitutionalApi = {
  // Login
  async login(matricula, senha) {
    console.log("🧪 MOCK: Tentando login institucional", {
      matricula,
      senha: "***",
    });
    await delay(1500);

    // Simular validação
    if (!matricula || !senha) {
      throw new Error("Matrícula e senha são obrigatórios");
    }

    if (matricula !== "20231234" || senha !== "teste123") {
      throw new Error("Matrícula ou senha incorretos");
    }

    // Salvar dados mock
    await AsyncStorage.setItem(
      "institutionData",
      JSON.stringify(mockInstitution)
    );
    await AsyncStorage.setItem("institutionToken", "mock-jwt-token-12345");
    await AsyncStorage.setItem("institutionMode", "mock"); // Marcar que está em modo mock

    return {
      success: true,
      message: "Login realizado com sucesso (modo mock)",
      token: "mock-jwt-token-12345",
      institution: mockInstitution,
    };
  },

  // Buscar estatísticas
  async getStats() {
    console.log("🧪 MOCK: Buscando estatísticas");
    await delay(800);

    return {
      success: true,
      data: mockStats,
    };
  },

  // Listar artigos
  async getArticles(status = null) {
    console.log(
      "🧪 MOCK: Buscando artigos",
      status ? `com status: ${status}` : ""
    );
    await delay(800);

    let filtered = mockArticles;
    if (status) {
      filtered = mockArticles.filter((article) => article.status === status);
    }

    return {
      success: true,
      data: filtered,
    };
  },

  // Buscar artigo por ID
  async getArticleById(id) {
    console.log("🧪 MOCK: Buscando artigo ID:", id);
    await delay(500);

    const article = mockArticles.find((a) => a.id === parseInt(id));

    if (!article) {
      throw new Error("Artigo não encontrado");
    }

    return {
      success: true,
      data: article,
    };
  },

  // Criar artigo
  async createArticle(articleData) {
    console.log("🧪 MOCK: Criando artigo:", articleData);
    await delay(1500);

    const newArticle = {
      id: Date.now(),
      ...articleData,
      status: "pending",
      views: 0,
      created_at: new Date().toISOString(),
      rejection_reason: null,
    };

    mockArticles.unshift(newArticle);

    return {
      success: true,
      message: "Artigo enviado para análise (modo mock)",
      data: newArticle,
    };
  },

  // Atualizar artigo
  async updateArticle(id, articleData) {
    console.log("🧪 MOCK: Atualizando artigo ID:", id, "com:", articleData);
    await delay(1200);

    const index = mockArticles.findIndex((a) => a.id === parseInt(id));

    if (index === -1) {
      throw new Error("Artigo não encontrado");
    }

    mockArticles[index] = { ...mockArticles[index], ...articleData };

    return {
      success: true,
      message: "Artigo atualizado (modo mock)",
      data: mockArticles[index],
    };
  },

  // Deletar artigo
  async deleteArticle(id) {
    console.log("🧪 MOCK: Deletando artigo ID:", id);
    await delay(1000);

    const index = mockArticles.findIndex((a) => a.id === parseInt(id));

    if (index === -1) {
      throw new Error("Artigo não encontrado");
    }

    mockArticles.splice(index, 1);

    return {
      success: true,
      message: "Artigo excluído (modo mock)",
    };
  },

  // Verificar se está em modo mock
  async isMockMode() {
    const mode = await AsyncStorage.getItem("institutionMode");
    return mode === "mock";
  },

  // Limpar dados mock
  async clearMockData() {
    await AsyncStorage.removeItem("institutionData");
    await AsyncStorage.removeItem("institutionToken");
    await AsyncStorage.removeItem("institutionMode");
  },
};

export default mockInstitutionalApi;
