import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostInput from "./PostInput";
import UserWidget from "./UserWidget";
import Posts from "../widgets/Posts";
const Layout = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const [profilePage, setProfilePage] = useState(false);
  return (
    <div className="h-screen text-white flex flex-col md:flex md:flex-row w-screen ">
      <div className="border w-full flex justify-center md:justify-start ">
        <UserWidget userId={_id} picturePath={picturePath} />
      </div>
      <div className="border w-full  p-5">
        <PostInput picturePath={picturePath} />
        <Posts userId={_id} profilePage={profilePage} setProfilePage={setProfilePage}/>
      </div>
      <div className="border w-full">check</div>
    </div>
  );
};

export default Layout;
