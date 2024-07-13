import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Login from "@/comps/Login";
import Signup from "@/comps/Signup";
import defaultuser from "../assets/defuser.jpg";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import Logout from "@/alerts/Logout";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const { isLoggedIn, avatar, username } = useSelector(
    (state) => state.userInfo
  );

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchTerm.trim() === "") navigate("/");
      else navigate(`/find/${searchTerm}`);
    }
  };

  const handleSubmit = () => {
    if (searchTerm.trim() === "") {
      navigate("/");
    } else navigate(`/find/${searchTerm}`);
  };

  return (
    <nav className="bg-black text-white flex items-center justify-between p-4 border-b border-white">
      <div className="flex items-center space-x-4">
        <img src="/path/to/logo.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex-grow flex justify-center items-center">
        <div className="relative w-full max-w-md">
          <Input
            className="bg-gray-800 text-white w-full"
            placeholder="Explore"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white font-bold"
            onClick={handleSubmit}
          >
            <CiSearch size={20} />
          </button>
        </div>
      </div>
      {!isLoggedIn ? (
        <div className="flex items-center space-x-2">
          <Login />
          <Signup />
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to={`/${username}`}>
            <Avatar>
              <AvatarImage src={avatar ? avatar : defaultuser} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <Logout />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
