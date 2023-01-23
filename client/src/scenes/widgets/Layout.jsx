import React from "react";
import { useSelector } from "react-redux";
import UserWidget from "./UserWidget";

const Layout = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <div className="h-screen text-white flex flex-col md:flex md:flex-row w-screen ">
      <div className="border w-full ">
        <UserWidget userId={_id} picturePath={picturePath} />
      </div>
      <div className="border w-full ">check</div>
      <div className="border w-full">check</div>
    </div>
  );
};

export default Layout;
