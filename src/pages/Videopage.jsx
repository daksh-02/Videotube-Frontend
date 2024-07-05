// Videopage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { VideoPlayer,RecommendedVideos,Comments} from '@/comps/Compiled.js';

const Videopage = () => {
  const { videoId } = useParams();

  return (
    <div className="bg-black px-6 py-4 flex h-full">
      <div className="main-video-container flex-1 mr-4">
        <VideoPlayer videoId={videoId} />
        <Comments videoId={videoId} />
      </div>
      <div className="sidebar w-1/3">
        <RecommendedVideos />
      </div>
    </div>
  );
};

export default Videopage;
