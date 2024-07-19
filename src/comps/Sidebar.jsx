import React from "react";
import { GrHomeRounded, GrLike, GrHistory, GrMenu } from "react-icons/gr";
import { BsCameraVideo } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { SlUserFollowing } from "react-icons/sl";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ isExpanded, toggleSidebar }) => {
  const { isLoggedIn, username } = useSelector((state) => state.userInfo);
  return (
    <div
      className={`bg-black text-white h-full flex flex-col justify-between border-r border-white p-4 ${
        isExpanded ? "w-64" : "w-20"
      } transition-all duration-500`}
    >
      <div className="flex flex-col space-y-2">
        <button
          onClick={toggleSidebar}
          className="text-white p-2 focus:outline-none"
        >
          <GrMenu size={24} />
        </button>
        {isLoggedIn ? (
          <Link to={`/${username}`}>
            <div
              className={`sidebar-button flex items-center p-2 cursor-pointer hover:bg-gray-200 hover:text-black transition ease-in-out duration-300 w-full ${
                isExpanded ? "border-b border-white" : ""
              }`}
            >
              <CgProfile size={24} className={isExpanded ? "mr-2" : ""} />
              {isExpanded && <span className="font-bold">Your Profile</span>}
            </div>
          </Link>
        ) : null}
        <Link to="/">
          <div
            className={`sidebar-button flex items-center p-2 cursor-pointer hover:bg-gray-200 hover:text-black transition ease-in-out duration-300 w-full ${
              isExpanded ? "border-b border-white" : ""
            }`}
          >
            <GrHomeRounded size={24} className={isExpanded ? "mr-2" : ""} />
            {isExpanded && <span className="font-bold">Home</span>}
          </div>
        </Link>
        <Link to="/likedVideos">
        <div
          className={`sidebar-button flex items-center p-2 cursor-pointer hover:bg-gray-200 hover:text-black transition ease-in-out duration-300 w-full ${
            isExpanded ? "border-b border-white" : ""
          }`}
        >
          <GrLike size={24} className={isExpanded ? "mr-2" : ""} />
          {isExpanded && <span className="font-bold">Liked Videos</span>}
        </div>
        </Link>
        <Link to="/watchHistory">
          <div
            className={`sidebar-button flex items-center p-2 cursor-pointer hover:bg-gray-200 hover:text-black transition ease-in-out duration-300 w-full ${
              isExpanded ? "border-b border-white" : ""
            }`}
          >
            <GrHistory size={24} className={isExpanded ? "mr-2" : ""} />
            {isExpanded && <span className="font-bold">History</span>}
          </div>
        </Link>
        <div
          className={`sidebar-button flex items-center p-2 cursor-pointer hover:bg-gray-200 hover:text-black transition ease-in-out duration-300 w-full ${
            isExpanded ? "border-b border-white" : ""
          }`}
        >
          <BsCameraVideo size={24} className={isExpanded ? "mr-2" : ""} />
          {isExpanded && <span className="font-bold">Your Videos</span>}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div
          className={`sidebar-button flex items-center p-2 cursor-pointer hover:bg-gray-200 hover:text-black transition ease-in-out duration-300 w-full ${
            isExpanded ? "border-b border-white" : ""
          }`}
        >
          <BiSupport size={24} className={isExpanded ? "mr-2" : ""} />
          {isExpanded && <span className="font-bold">Support</span>}
        </div>
        <div
          className={`sidebar-button flex items-center p-2 cursor-pointer hover:bg-gray-200 hover:text-black transition ease-in-out duration-300 w-full ${
            isExpanded ? "border-b border-white" : ""
          }`}
        >
          <IoSettingsOutline size={24} className={isExpanded ? "mr-2" : ""} />
          {isExpanded && <span className="font-bold">Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
