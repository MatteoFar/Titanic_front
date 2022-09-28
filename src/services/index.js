import axios from "axios";

const titanicService = axios.create({
  baseURL: "http://localhost:7003/",
  headers: {
    "Content-Type": "application/json",
  },
});

titanicService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const apiService = {
  async postUser(newUser) {
    const res = await titanicService.post("/signup", newUser);
    return res;
  },

  async postLogin(user) {
    const res = await titanicService.post("/signin", user);
    return res;
  },

  async getAllPassengers() {
    const res = await titanicService.get("/getAllPassengers");
    return res;
  },
};

export default apiService;
