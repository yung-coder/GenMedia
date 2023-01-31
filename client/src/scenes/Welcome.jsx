import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 flex justify-center items-center">
      <div className="min-h-screen flex items-center justify-center">
        <div className="grid md:grid-cols-2 gap-8 grid-cols-1">
          <div
            className="b relative mx-auto h-16 w-64 flex justify-center items-center"
            onClick={() => navigate("/login")}
          >
            <div className="i h-16 w-64 bg-purple-600 items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
            <a className="text-center text-white font-semibold z-10 pointer-events-none">
              Login
            </a>``
          </div>

          <div
            className="b animate-pulse mx-auto h-16 w-64 flex justify-center items-center"
            onClick={() => navigate("/register")}
          >
            <div className="i h-16 w-64 bg-pink-600 items-center rounded-2xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
            <a className="text-center text-white font-semibold z-10 pointer-events-none">
              Register
            </a>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
