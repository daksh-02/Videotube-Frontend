import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "@/constants";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import PlayerDetail from "./PlayerDetails";
import { FaRegPlayCircle } from "react-icons/fa";

const VideoPlayer = () => {
  const { videoId } = useParams();
  const defaultVideoUrl = "default_video_url.mp4";
  const [video, setVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`${server}/videos/${videoId}`);
        const res = response.data;
        setVideo(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [videoId]);

  const handleThumbnailClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="bg-black shadow-lg">
      {isPlaying ? (
        <ReactPlayer
          url={video ? video.videoFile.url : defaultVideoUrl}
          controls
          width="100%"
          height="540px"
          playing={true}
          className="bg-black rounded-t-lg"
        />
      ) : (
        <div
          className="relative w-full h-96 bg-black cursor-pointer"
          onClick={handleThumbnailClick}
          style={{
            backgroundImage: `url(${
              video ? video.thumbnail.url : "default_thumbnail.png"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="text-white text-4xl"><FaRegPlayCircle size = {75}/></button>
          </div>
        </div>
      )}

      <PlayerDetail video={video}/>
      
    </div>
  );
};

export default VideoPlayer
