import axiosClient from "./axiosConfig";

export class UserAPI {
  //Login
  static login(param) {
    const url = "/users/login";
    return axiosClient.post(url, param);
  }

  // Lấy thông tin người dùng đang đăng nhập
  static getProfile(id) {
    const url = `/users/me/${id}`;
    return axiosClient.get(url);
  }

  //Lấy dữ liệu để gợi ý follow
  static suggestFollow() {
    const url = `/users/suggest-follow`;
    return axiosClient.get(url);
  }

  // Lấy thông tin chi tiết User
  static getUserbyID(id) {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  }

  //Tạo thêm following
  static makeNewFollow(param) {
    const url = `/users/following`;
    return axiosClient.post(url, param);
  }

  //Check user follow or not
  static checkFollow(param) {
    const url = `/users/following/check/${param._id}`;
    return axiosClient.get(url, param);
  }

  //Check user follow or not
  static unFollow(param) {
    const url = `/users/following/check/${param._id}`;
    return axiosClient.delete(url, param);
  }

  //GET FOLLOWING
  static getFollowing(){
    const url = `/users/following`;
    return axiosClient.get(url);
  }
}
