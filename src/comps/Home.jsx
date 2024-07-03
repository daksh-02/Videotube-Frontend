import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdPlayCircleOutline } from "react-icons/md";
import { server } from "@/constants";
import VideoCard from "./VideoCard";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.userInfo.isLoggedIn);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get(`${server}/users/videos`, {
          withCredentials: true,
        });
        const res = await response.data;
        console.log(res);
        setVideos(res.data);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      }
    };

    if (isLoggedIn) {
      getVideos();
    }
  }, [isLoggedIn]);

  return (
    <>
      {videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow p-4 text-center bg-black h-full">
          <MdPlayCircleOutline
            className="text-8xl mb-4"
            style={{ color: "#ff00ff" }}
          />
          <h2 className="text-2xl text-white">No videos available</h2>
          <p className="text-white">
            There are no videos here available.{" "}
            {isLoggedIn
              ? "Please try to search something else."
              : "Please log in"}
          </p>
        </div>
      ) : (
        <div className="bg-black h-full p-3">
        {videos.map((video) => <VideoCard key={video._id} video={video} />)}
        </div>
      )}
    </>
  );
};

export default Home;
