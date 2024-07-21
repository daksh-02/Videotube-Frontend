import React, { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { MdDelete, MdModeEdit } from "react-icons/md";
import axios from "axios";
import { server } from "@/constants";
import VideoDelete from "@/alerts/VideoDelete";
import { Link } from "react-router-dom";

const StatsCard = ({ video, handleDelete }) => {
  const [isPublished, setIsPublished] = useState(video.isPublished);

  const handleChange = async () => {
    try {
      await axios.patch(
        `${server}/videos/toggle/publish/${video._id}`,
        {},
        { withCredentials: true }
      );
      setIsPublished((prevState) => !prevState);
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
    }
  };

  return (
    <TableRow className="border-t border-white">
      <TableCell className="flex items-center justify-center px-6">
        <Switch checked={isPublished} onCheckedChange={handleChange} />
      </TableCell>
      <TableCell
        className={`text-center px-6 ${
          isPublished ? "text-green-600" : "text-orange-600"
        }`}
      >
        {isPublished ? "Published" : "Unpublished"}
      </TableCell>
      <TableCell className="text-center px-6 ">
        <Link
          to={`/video/${video._id}`}
          className="hover:text-purple-500 hover:font-bold"
        >
          {video.title}
        </Link>
      </TableCell>
      <TableCell className="text-center px-6">
        {video.views} views / {video.likes} likes
      </TableCell>
      <TableCell className="text-center px-6">
        {new Date(video.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell className="text-center px-6">
        <div className="flex justify-center gap-x-3">
          <VideoDelete _id={video._id} handleChange={handleDelete} />
          <MdModeEdit size={17} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default StatsCard;
