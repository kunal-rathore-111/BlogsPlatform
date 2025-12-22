import axios from "axios"

export const apiService = axios.create({
    baseURL: "https://2nd-mind-backend.vercel.app/app/v2/user/public",
    timeout: 60 * 1000 * 10,
});


