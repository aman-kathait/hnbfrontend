import React from "react";
import { Search, Bell, MessageCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-0 ">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo & Title */}
          <div className="flex items-center">
            <img className="h-9 pl-1 mr-2" src="hnblogo.png" alt="HNB Logo" />
            <h1 className="text-lg md:text-2xl font-bold text-[#008336]">
              HNB <span className="text-black">Connect</span>
            </h1>
          </div>

          {/* Center: Search Bar (Hidden on small screens) */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full pl-10 pr-4 py-2 text-sm font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500 h-4 w-4" />
            </div>
          </div>

          {/* Right: Icons (Always visible) */}
          <div className="flex items-center space-x-3 md:space-x-5 gap-3">
            <Link to="/chat">
              <MessageCircle className="h-6 w-6 text-gray-700 hover:text-green-600 transition duration-200" />
            </Link>
            <Link to="/notifications">
              <Bell className="h-6 w-6 text-gray-700 hover:text-green-600 transition duration-200" />
            </Link>
            <Link to="/profile">
              <Avatar className="w-8 h-8 hidden md:block">
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
