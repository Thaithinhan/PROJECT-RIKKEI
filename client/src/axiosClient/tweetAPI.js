import axiosClient from "./axiosConfig";

export class TweetAPI {
  //Get Tweet for current user
  static getTweetForCurrentUser() {
    const url = "/tweets/mytweet";
    return axiosClient.get(url);
  }

  // //Tạo Tweet mới
  // static createTweet(param) {
  //   const url = "/tweets";
  //   return axiosClient.post(url, param);
  // }
}
