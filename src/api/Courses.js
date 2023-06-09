import axiosClient from "./AxiosClients";

export class CourseAPI {
  static getAllcourse() {
    const url = "/courses";
    return axiosClient.get(url);
  }

  static getCourseById(param) {
    const url = `/courses/${param}`;
    return axiosClient.get(url);
  }

  static postCourse(param) {
    const url = "/courses";
    return axiosClient.post(url, param);
  }

  static removeCourse(param) {
    const id = +param;
    console.log("id", id);
    const url = `/courses/${id}`;
    return axiosClient.delete(url);
  }
}
