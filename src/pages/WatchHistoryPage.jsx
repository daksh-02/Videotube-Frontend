import WatchHistoryCard from "@/Card/WatchHistoryCard";
import React from "react";
import { useSelector } from "react-redux";

const WatchHistoryPage = () => {
  const watchHistory = useSelector((state) => state.userInfo.watchHistory);
  return (
    <div className="p-2">
      {watchHistory.length > 0 &&
        watchHistory.map((videoId) => (
          <WatchHistoryCard videoId={videoId} key={videoId} />
        ))}
    </div>
  );
};

export default WatchHistoryPage;
