import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Login from "@/comps/Login";
import Signup from "@/comps/Signup";
import defaultuser from "../assets/defuser.jpg";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { logout } from "@/store/UserSlice";
import axios from "axios";
import { server } from "@/constants";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, avatar, username } = useSelector(
    (state) => state.userInfo
  );

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${server}/users/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-black text-white flex items-center justify-between p-4 border-b border-white">
      <div className="flex items-center space-x-4">
        <img src="/path/to/logo.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex-grow flex justify-center">
        <Input
          className="bg-gray-800 text-white w-full max-w-md"
          placeholder="Search"
        />
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
          <Button
            className="bg-purple-500 text-white hover:bg-purple-700"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
