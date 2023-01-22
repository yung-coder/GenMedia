import React from "react";
import Login from './Login';
import Register from './Register';
const AuthSection = () => {
  return (
    <>
      <div className="bg-slate-300 flex justify-center items-center p-1">
        <h1 className="text-2xl font-bold text-black tracking-widest">
          GenPedia
        </h1>
      </div>
      <div className="mt-16">
         <Register />
      </div>
    </>
  );
};

export default AuthSection;
