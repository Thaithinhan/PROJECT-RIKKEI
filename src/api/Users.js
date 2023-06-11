import axiosClient from "./AxiosClients";

export class UserAPI {
  static register(param) {
    const url = "/register";
    return axiosClient.post(url, param);
  }

  static getUser(param) {
    const url = `/users/${param}`;
    return axiosClient.get(url);
  }

  static login(param) {
    const url = "/login";
    return axiosClient.post(url, param);
  }
}
