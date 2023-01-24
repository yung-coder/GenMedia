import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state/index";
import UserImage from "../../components/UserImage";
import design from "../../../public/design.jpg";
import { GrLocation } from "react-icons/gr";
import { MdWorkOutline } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";

const UserWidget = ({ userId, picturePath }) => {
  console.log(typeof picturePath);
  const [user, setuser] = useState();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setuser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    email,
    friends,
    loacation,
    occupation,
    viewwdProfile,
    impressions,
  } = user;

  return (
    <div className="w-fit">
      <div className="flex flex-col border justify-center items-center p-5 bg-white rounded-xl">
        <div className="flex justify-center items-center space-x-4 p-5">
          <div className="flex justify-center items-center">
            <UserImage image={picturePath} />
          </div>
          <div className="flex flex-col space-y-2 text-black">
            {firstName}
            <AiOutlineUserAdd color="black" />
          </div>
        </div>
        <div className="flex flex-col  space-y-3 p-5">
          <div className="flex space-x-4">
            <h1 className="text-gray-400">Impressions</h1>
            <h1 className="text-black">{impressions}</h1>
          </div>
          <div className="flex space-x-4">
            <h1 className="text-gray-400">Profle Views</h1>
            <h1 className="text-black">{viewwdProfile}</h1>
          </div>
        </div>
        <div className="flex space-x-4 justify-center items-center p-5">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <GrLocation />
            <h1 className="text-black">{loacation}</h1>
          </div>
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdWorkOutline color="black" />
            <h1 className="text-black">{occupation}</h1>
          </div>
          <div className="flex flex-col space-y-3 justify-center items-center">
            <h1 className="text-black">{friends.length}</h1>
            <h1 className="text-black">Friends</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
