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
    <div className=" text-white flex flex-col md:flex md:flex-row md:h-screen md:w-screen">
      <div className="flex justify-center items-center flex-col md:hidden">
        <div className="w-[480px] flex justify-center md:justify-start flex-col items-center">
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
      </div>

      <div className="w-[480px] hidden justify-center md:justify-start flex-col items-center md:flex">
        <UserWidget userId={_id} picturePath={picturePath} />
      </div>
      <div className="w-[800px] p-5  hidden  justify-center items-center flex-col space-y-5 md:flex">
        <PostInput picturePath={picturePath} />
        <Posts
          userId={_id}
          profilePage={profilePage}
          setProfilePage={setProfilePage}
        />
      </div>

      <div className="flex justify-center w-full  flex-col items-center space-y-4 p-7">
        <FriendsWidgets userID={_id} />
        <Promotions />
      </div>
    </div>
  );
};

export default Layout;
