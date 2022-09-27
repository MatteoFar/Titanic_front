import axios from "axios";

const titanicService = axios.create({
  baseURL: "http://localhost:7001/",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiService = {
  async postUser(newUser) {
    const res = await titanicService.post("/signup", newUser);
    return res;
  },
};

export default apiService;
