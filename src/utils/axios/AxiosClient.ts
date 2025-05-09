import axios, {AxiosInstance} from "axios";

const axiosClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosClient;