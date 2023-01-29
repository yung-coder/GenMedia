import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostInput from "./PostInput";
import UserWidget from "./UserWidget";
import Posts from "../widgets/Posts";
import FriendsWidgets from "./FriendsWidgets";
import Promotions from "./Promotions";
const Layout = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const [profilePage, setProfilePage] = useState(false);
  return (
    <div className="h-screen text-white flex flex-col md:flex md:flex-row w-screen ">
      <div className="w-[480px] flex justify-center md:justify-start ">
        <UserWidget userId={_id} picturePath={picturePath} />
      </div>
      <div className="w-[800px] p-5  flex  justify-center items-center flex-col space-y-5 ">
        <PostInput picturePath={picturePath} />
        <Posts
          userId={_id}
          profilePage={profilePage}
          setProfilePage={setProfilePage}
        />
      </div>
      <div className="flex justify-center w-[400px]   flex-col items-center space-y-8 p-7">
        <FriendsWidgets userID={_id} />
        <Promotions />
      </div>
    </div>
  );
};

export default Layout;
