import axios from "axios";

// const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:8080/api' : "/api";
// export const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//     }
// })



export const api = axios.create({
    // Chỉ cần thế này, Vite (local) hoặc Express (prod) sẽ tự hiểu
    baseURL: '/api',
    headers: {
        "Content-Type": "application/json"
    }
});