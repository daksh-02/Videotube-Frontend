// Comments.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([
    { id: '1', text: 'Default comment 1', user: 'User1' },
    { id: '2', text: 'Default comment 2', user: 'User2' },
  ]);

  useEffect(() => {
    const fetchComments = async () => {
    //   try {
    //     const response = await axios.get(`API_ENDPOINT/videos/${videoId}/comments`);
    //     setComments(response.data);
    //   } catch (error) {
    //     console.error('Error fetching comments:', error);
    //   }
    };

    fetchComments();
  }, [videoId]);

  return (
    <div className="comments">
      <h2 className="text-white text-xl font-bold mb-4">Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="mb-4">
            <p className="text-gray-400">{comment.text}</p>
            <p className="text-gray-600 text-sm">- {comment.user}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
