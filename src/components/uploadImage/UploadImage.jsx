import React, { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

const UploadImage = () => {
  const [imgList, setImgList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const handleOnchange = async (event) => {
    const images = event.target.files;
    const imageList = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      const downloadURL = await getDownloadURL(storageRef);
      console.log(downloadURL);
      imageList.push(downloadURL);
    }

    setImgList(imageList);
  };

  const handleOnchangeVideo = async (event) => {
    const videos = event.target.files;
    const videoList = [];

    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const storageRef = ref(storage, `videos/${video.name}`);
      await uploadBytes(storageRef, video);

      const downloadURL = await getDownloadURL(storageRef);
      videoList.push(downloadURL);
    }

    setVideoList(videoList);
  };

  return (
    <div>
      <input type="file" onChange={handleOnchange} multiple />
      <input type="file" onChange={handleOnchangeVideo} multiple />

      {imgList && imgList.map((img) => <img src={img} />)}

      {videoList &&
        videoList.map((video, index) => (
          <video key={index} src={video} controls>
            Your browser does not support the video tag.
          </video>
        ))}
    </div>
  );
};

export default UploadImage;
