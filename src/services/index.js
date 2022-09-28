import axios from "axios";

const titanicService = axios.create({
  baseURL: "http://localhost:7003/",
  headers: {
    "Content-Type": "application/json",
  },
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
};

export default apiService;
