import AsyncStorage from '@react-native-async-storage/async-storage';

// Salvar dados
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    return false;
  }
};

// Recuperar dados
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Erro ao recuperar dados:', error);
    return null;
  }
};

// Remover dados
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Erro ao remover dados:', error);
    return false;
  }
};

// Limpar tudo
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    return false;
  }
};
