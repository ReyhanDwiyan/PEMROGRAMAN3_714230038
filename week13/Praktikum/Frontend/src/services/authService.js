import axios from "axios";

const LOGIN_URL = "https://backendpemrog-production.up.railway.app/login";
const REGISTER_URL = "https://backendpemrog-production.up.railway.app/register";

export const login = async (username, password) => {
    const response = await axios.post(LOGIN_URL, { username, password });
    return response.data;
};

export const register = async (username, password, role = "user") => {
    const response = await axios.post(REGISTER_URL, { username, password, role });
    return response.data;
};