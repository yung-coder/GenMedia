import React from "react";
import Login from './Login';
const AuthSection = () => {
  return (
    <>
      <div className="bg-slate-300 flex justify-center items-center p-1">
        <h1 className="text-2xl font-bold text-black tracking-widest">
          GenPedia
        </h1>
      </div>
      <div className="mt-16">
        <Login />
      </div>
    </>
  );
};

export default AuthSection;
