import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL

export const axiosBD = axios.create({
    baseURL: baseUrl,
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDhkMjFlYmMxYTA1MTdjODZjOTQ3YzNiZjU1Y2MwZSIsIm5iZiI6MTc1OTA3Mzk2My4wNjcwMDAyLCJzdWIiOiI2OGQ5NTZhYjFlMjZiNWZkZGNlMWJiZGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NMGbDzfPvp2rL8LAV12RE_ji9gWtMpYMIyaBHXIPkYU'
    }
});

axiosBD.interceptors.request.use((request) => {
    return request;
});