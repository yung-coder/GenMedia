import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostInput from "../scenes/widgets/PostInput";
import UserWidget from "../scenes/widgets/UserWidget";
import Posts from "../scenes/widgets/Posts";
import FriendsWidgets from "../scenes/widgets/FriendsWidgets";
import Navbar from "../scenes/Navbar";
import Promotions from "./widgets/Promotions";
import { BASE_URL } from "../../utils/deploy";
const index = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const [profilePage, setProfilePage] = useState(false);

  const getUser = async () => {
    const response = await fetch(`${BASE_URL || 'http://localhost:3001'}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className=" text-white flex flex-col md:flex md:flex-row md:h-screen md:w-screen">
        <div className="flex justify-center items-center flex-col md:hidden">
          <div className="w-[480px] flex justify-center md:justify-start flex-col items-center">
            <UserWidget userId={userId} picturePath={user.picturePath} />
          </div>
          <div className="w-[800px] p-5  flex  justify-center items-center flex-col space-y-5 ">
            <PostInput picturePath={user.picturePath} />
            <Posts
              userId={userId}
              profilePage={profilePage}
              setProfilePage={setProfilePage}
            />
          </div>
        </div>

        <div className="w-[480px] hidden justify-center md:justify-start flex-col items-center md:flex">
          <UserWidget userId={userId} picturePath={user.picturePath} />
        </div>
        <div className="w-[800px] p-5  hidden  justify-center items-center flex-col space-y-5 md:flex">
          <PostInput picturePath={user.picturePath} />
          <Posts
            userId={userId}
            profilePage={profilePage}
            setProfilePage={setProfilePage}
          />
        </div>

        <div className="flex justify-center w-[400px]  flex-col items-center space-y-4 p-7">
          <FriendsWidgets userID={userId} />
          <Promotions />
        </div>
      </div>
    </>
  );
};

export default index;
