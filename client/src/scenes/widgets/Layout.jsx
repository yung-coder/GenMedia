import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostInput from "./PostInput";
import UserWidget from "./UserWidget";
import Posts from "../widgets/Posts";
import FriendsWidgets from "./FriendsWidgets";
const Layout = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const [profilePage, setProfilePage] = useState(false);
  return (
    <div className="h-screen text-white flex flex-col md:flex md:flex-row w-screen ">
      <div className="w-[600px] flex justify-center md:justify-start ">
        <UserWidget userId={_id} picturePath={picturePath} />
      </div>
      <div className="w-[800px] p-5  flex flex-col space-y-5 ">
        <PostInput picturePath={picturePath} />
        <Posts
          userId={_id}
          profilePage={profilePage}
          setProfilePage={setProfilePage}
        />
      </div>
      <div>
        <FriendsWidgets userID={_id} />
      </div>
    </div>
  );
};

export default Layout;
