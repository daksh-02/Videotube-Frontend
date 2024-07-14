import { server } from "@/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { VideoCard } from "@/comps/Compiled";
import { RxCross1 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { AiOutlineSave } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setWatchHistory } from "@/store/UserSlice";

const WatchHistoryCard = ({ videoId }) => {
  const dispatch = useDispatch();
  const watchHistory = useSelector((state) => state.userInfo.watchHistory);
  const [video, setVideo] = useState();

  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await axios.get(`${server}/videos/${videoId}`);
        const res = response.data;
        setVideo(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getVideo();
  }, [videoId]);

  const handleDelete = () => {
    let newWatchHistory = watchHistory.filter((ele) => ele !== videoId);
    dispatch(setWatchHistory(newWatchHistory));
  };

  return (
    <div className="relative w-full">
      {video ? <VideoCard video={video} /> : null}
      <div className="absolute top-2 right-14 flex items-center space-x-2">
        <button className="p-2  text-white rounded-full" onClick={handleDelete}>
          <RxCross1 size={18} />
        </button>
        <Button variant="secondary" className="flex items-center">
          <AiOutlineSave className="mr-2" size={18} />
          <span className="font-bold">Save</span>
        </Button>
      </div>
    </div>
  );
};

export default WatchHistoryCard;
