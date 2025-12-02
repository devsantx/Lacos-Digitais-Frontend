/**
 * Configuração de Ambientes
 * Gerencia URLs baseado em desenvolvimento vs produção
 */

const ENV = {
  dev: {
    apiUrl: "http://192.168.1.YOUR_IP:3000/api", // Seu IP local
    appUrl: "http://localhost:19000", // Expo localhost
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
  // Em produção, sempre usar staging/prod
  // Em desenvolvimento, usar dev
  if (__DEV__) {
    return ENV.staging; // Trocamos para staging por padrão (Render)
  }
  return ENV.prod;
};

export default getEnvVars;
