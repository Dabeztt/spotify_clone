import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "2b756c859dc444e7a8d85c004dea474c";
const redirectUri = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
})

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
        console.log('Axios Config:', config);
        config.headers.Authorization = "Bearer " + token;
        return config;
    });
};

export default apiClient