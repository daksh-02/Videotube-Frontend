// RecommendedVideos.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecommendedVideos = () => {
  const [videos, setVideos] = useState([
    {
      id: '1',
      thumbnail: { url: 'default_thumbnail.jpg' },
      title: 'Default Recommended Video 1',
      views: '1K',
      createdAt: '2023-01-01',
    },
    {
      id: '2',
      thumbnail: { url: 'default_thumbnail.jpg' },
      title: 'Default Recommended Video 2',
      views: '2K',
      createdAt: '2023-01-02',
    },
  ]);

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
    //   try {
    //     const response = await axios.get('API_ENDPOINT/recommended');
    //     setVideos(response.data);
    //   } catch (error) {
    //     console.error('Error fetching recommended videos:', error);
    //   }
    };

    fetchRecommendedVideos();
  }, []);

  return (
    <div className="recommended-videos">
      <h2 className="text-white text-xl font-bold mb-4">Recommended Videos</h2>
      <ul>
        {videos.map(video => (
          <li key={video.id} className="mb-4">
            <Link to={`/video/${video.id}`} className="flex items-center gap-4">
              <img src={video.thumbnail.url} alt={video.title} className="w-20 h-12 object-cover" />
              <div>
                <h3 className="text-white">{video.title}</h3>
                <p className="text-gray-400 text-sm">{video.views} Views • {video.createdAt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedVideos;
