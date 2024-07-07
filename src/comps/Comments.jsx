import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
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
  const observer = useRef();

  const lastCommentElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const fetchComments = useCallback(
    async (pageToFetch) => {
      try {
        const response = await axios.get(
          `${server}/comments/${videoId}?page=${pageToFetch}&limit=4`,
          { withCredentials: true }
        );
        const res = response.data;
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
    },
    [videoId]
  );

  useEffect(() => {
    setComments([]);
    setPage(1);
    setHasMore(true);
    uniqueCommentIds.current.clear();
    fetchComments(1);
  }, [videoId, fetchComments]);

  useEffect(() => {
    if (page > 1) {
      fetchComments(page);
    }
  }, [page, fetchComments]);

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
            if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault();
              setNewComment((prev) => prev + "\n");
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
      <ul>
        {comments.map((comment, index) => {
          if (comments.length === index + 1) {
            return (
              <li
                ref={lastCommentElementRef}
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
                      <p className="text-white font-bold hover:text-purple-500 hover:underline hover:underline-offset-4 hover:decoration-purple-500">
                        {comment.ownerDetails.fullname}
                      </p>
                      <p className="text-gray-400 text-sm hover:text-purple-500 hover:underline hover:underline-offset-4 hover:decoration-purple-500">
                        @{comment.ownerDetails.username}
                      </p>
                    </div>
                  </div>
                </Link>
                <p className="text-white">{comment.content}</p>
              </li>
            );
          } else {
            return (
              <li
                key={comment._id}
                className="mb-4 text-white border-t border-white py-2"
              > 
              <div className="flex gap-2">
                <Link to={`/${comment.ownerDetails.username}`}>
                  <div className="flex items-center mb-2">
                    <img
                      src={comment.ownerDetails.avatar}
                      alt={comment.ownerDetails.username}
                      className="w-10 h-10 rounded-full mr-2 hover:border-2 border-purple-500"
                    />
                    <div>
                      <p className="text-white font-bold hover:text-purple-500 hover:underline hover:underline-offset-4 hover:decoration-purple-500">
                        {comment.ownerDetails.fullname}
                      </p>
                      <p className="text-gray-400 text-sm hover:text-purple-500 hover:underline hover:underline-offset-4 hover:decoration-purple-500">
                        @{comment.ownerDetails.username}
                      </p>
                    </div>
                  </div>
                </Link>
                <span>•</span>
                <div className="text-xs flex pt-[4px]">{getTimeDifference(comment.createdAt)}</div>
                </div>
                <p className="text-white">{comment.content}</p>
              </li>
            );
          }
        })}
        {hasMore && (
          <div className="text-white text-center mt-4">
            Loading more comments...
          </div>
        )}
      </ul>
    </div>
  );
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

export default CommentSection;
