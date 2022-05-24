import axios from "axios";
import getLocalStorageServices from "./local-storage.service";
import {environment} from "../environments/environment"
const API_URL = environment.api_url;

class AuthService {
  dummyLogin(username: string = "", password: string = "") {
    return getLocalStorageServices.setLocalStorageObject("user",environment.user_mock_data);
  }
  login(username: string, password: string) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return getLocalStorageServices.getLocalStorageObject("user");
  }
}

export default new AuthService();
