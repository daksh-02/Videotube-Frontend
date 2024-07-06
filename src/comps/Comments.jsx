import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input } from "@/components/ui/input";
import { server } from "@/constants";
import { useParams, Link } from "react-router-dom";
import { RxTriangleRight } from "react-icons/rx";

const CommentSection = () => {
  const { videoId } = useParams();
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [newComment, setNewComment] = useState("");
  const uniqueCommentIds = useRef(new Set());

  useEffect(() => {
    // Reset comments and page when videoId changes
    setComments([]);
    setPage(1);
    setHasMore(true);
    uniqueCommentIds.current.clear();
    fetchComments(1);
  }, [videoId]);

  const fetchComments = async (pageToFetch) => {
    try {
      const response = await axios.get(
        `${server}/comments/${videoId}?page=${pageToFetch}&limit=4`,
        { withCredentials: true }
      );
      const res = response.data;
      console.log(res.data);
      // Filter out duplicate comments
      const newComments = res.data.comments.filter(
        (comment) => !uniqueCommentIds.current.has(comment._id)
      );

      newComments.forEach((comment) =>
        uniqueCommentIds.current.add(comment._id)
      );

      setComments((prevComments) => [...prevComments, ...newComments]);

      if (newComments.length === 0) setHasMore(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim().length > 0) {
      try {
        const response = await axios.post(
          `${server}/comments/${videoId}`,
          { content: newComment },
          { withCredentials: true }
        );
        setNewComment("");
        setComments((prevComments) => [response.data.data, ...prevComments]);
        uniqueCommentIds.current.add(response.data.data._id);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <div className="bg-black p-4 rounded-lg border-white border-2">
      <h3 className="text-white mb-4">{comments.length} Comments</h3>
      <div className="relative mb-6">
        <Input
          className="bg-gray-800 text-white pr-10"
          placeholder="Add a Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddComment();
            }
          }}
        />
        {newComment.trim().length > 0 && (
          <RxTriangleRight
            onClick={handleAddComment}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white hover:text-purple-500"
            size={30}
          />
        )}
      </div>
      <InfiniteScroll
        dataLength={comments.length}
        next={() => {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchComments(nextPage);
        }}
        hasMore={hasMore}
        loader={<h4 className="text-white">Loading...</h4>}
        endMessage={<p className="text-white">No more comments</p>}
      >
        <ul>
          {comments &&
            comments.map((comment) => (
              <li
                key={comment._id}
                className="mb-4 text-white border-t border-white py-2"
              >
                <Link to={`/${comment.ownerDetails.username}`}>
                  <div className="flex items-center mb-2">
                    <img
                      src={comment.ownerDetails.avatar}
                      alt={comment.ownerDetails.username}
                      className="w-10 h-10 rounded-full mr-2 hover:border-2 border-purple-500"
                    />
                    <div>
                      <p className="text-white font-bold  hover:text-purple-500 hover:underline hover:underline-offset-4 hover:decoration-purple-500">
                        {comment.ownerDetails.fullname}
                      </p>
                      <p className="text-gray-400 text-sm  hover:text-purple-500 hover:underline hover:underline-offset-4 hover:decoration-purple-500">
                        @{comment.ownerDetails.username}
                      </p>
                    </div>
                  </div>
                </Link>
                <p className="text-white">{comment.content}</p>
              </li>
            ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default CommentSection;
