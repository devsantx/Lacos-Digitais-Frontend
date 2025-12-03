/**
 * Configuração de Ambientes
 * Gerencia URLs baseado em desenvolvimento vs produção
 */

const ENV = {
  dev: {
    apiUrl: "http://192.168.1.YOUR_IP:3000/api", // Para testes locais
    appUrl: "http://localhost:19000",
  },
  staging: {
    apiUrl: "https://lacos-digitais-api.onrender.com/api",
    appUrl: "https://staging.lacosdigitais.com",
  },
  prod: {
    apiUrl: "https://lacos-digitais-api.onrender.com/api",
    appUrl: "https://lacosdigitais.com",
  },
};

const getEnvVars = () => {
  // Em desenvolvimento (Expo), usar a API hospedada no Render (staging)
  if (__DEV__) {
    return ENV.staging;
  }

  // Em produção (build final)
  return ENV.prod;
};

export default getEnvVars;
