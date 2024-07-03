import { server } from "@/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VideoUploadDialog from "./VideoUploadDialog";
import { useSelector } from "react-redux";

const Video = () => {
  const username = useSelector((state) => state.userInfo.username);
  const { profile } = useParams();

  const [videos, setVideos] = useState([]);
  const [flag, setFlag] = useState(false);
  const [uploadCount, setUploadCount] = useState(0); // State to trigger useEffect

  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await axios.get(
          `${server}/videos/${
            profile.charAt(0) == ":" ? profile.substring(1) : profile
          }`
        );
        const res = response.data;
        console.log(res);
        setVideos(res.data.videos);
      } catch (error) {
        console.error(error);
      }
    };

    setFlag(
      (profile.charAt(0) == ":" ? profile.substring(1) : profile) === username
    );

    getAllVideos();
  }, [profile, uploadCount]); // Add uploadCount as a dependency

  const handleUploadComplete = () => {
    setUploadCount((prevCount) => prevCount + 1); // Increment the upload count to trigger useEffect
  };

  const getTimeDifference = (date) => {
    const now = new Date();
    const videoDate = new Date(date);
    const diffInSeconds = Math.floor((now - videoDate) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `just now`;
  };

  return (
    <div className="w-full px-4 bg-black text-white min-h-[50vh]">
      {flag ? (
        <div className="flex w-full py-4">
          <VideoUploadDialog onUploadComplete={handleUploadComplete} />
        </div>
      ) : null}

      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${
          !flag ? "py-4" : ""
        }`}
      >
        {videos.map((video, index) => (
          <Card key={index} className="bg-black text-white border-none">
            <CardHeader className="p-0">
              <img
                src={video.thumbnail.url}
                alt={video.title}
                className="w-[95%] h-40 object-cover"
              />
            </CardHeader>
            <CardContent className="text-left p-0">
              <h3 className="text-lg font-bold my-2">{video.title}</h3>
              <p className="text-sm">
                {video.views} Views • {getTimeDifference(video.createdAt)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Video;
