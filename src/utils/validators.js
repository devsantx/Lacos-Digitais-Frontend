export const validators = {
  required: (value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return `${fieldName} é obrigatório`;
    }
    return null;
  },

  minLength: (value, length, fieldName) => {
    if (value && value.length < length) {
      return `${fieldName} deve ter no mínimo ${length} caracteres`;
    }
    return null;
  },

  email: (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !regex.test(value)) {
      return "Email inválido";
    }
    return null;
  },

  matchPassword: (password, confirmPassword) => {
    if (password && confirmPassword && password !== confirmPassword) {
      return "As senhas não conferem";
    }
    return null;
  },

  username: (value) => {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    if (value && !regex.test(value)) {
      return "Username deve ter 3-20 caracteres (letras, números, _)";
    }
    return null;
  },
};
