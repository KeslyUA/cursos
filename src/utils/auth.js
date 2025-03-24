import axios from "axios";

const BASE_URL = "http://localhost:3001"; 

export async function login(usuario, contraseña) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { usuario, contraseña });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "Usuario o contraseña incorrectos" };
  }
}

