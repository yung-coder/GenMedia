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
      <div className="border w-[600px] flex justify-center md:justify-start ">
        <UserWidget userId={_id} picturePath={picturePath} />
      </div>
      <div className="border w-full  flex flex-col  border-purple-700">
        <div className="border w-[600px]">
          <PostInput picturePath={picturePath} />
        </div>
        <div className="border border-red-700 h-full">
          <Posts
            userId={_id}
            profilePage={profilePage}
            setProfilePage={setProfilePage}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
