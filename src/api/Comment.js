import axiosClient from "./AxiosClients";

export class CommentAPI {
  static getAllComment() {
    const url = "/comments";
    return axiosClient.get(url);
  }

  // static getCourseById(param) {
  //   const url = `/courses/${param}`;
  //   return axiosClient.get(url);
  // }

  static postComment(param) {
    const url = "/comments";
    return axiosClient.post(url, param);
  }

  // static removeCourse(param) {
  //   const id = +param;
  //   console.log("id", id);
  //   const url = `/courses/${id}`;
  //   return axiosClient.delete(url);
  // }
}
