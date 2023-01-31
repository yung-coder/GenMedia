import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state/index";
import UserImage from "../../components/UserImage";
import { GrLocation } from "react-icons/gr";
import { MdWorkOutline } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BASE_URL } from "../../../utils/deploy";

const UserWidget = ({ userId, picturePath }) => {

  const [user, setuser] = useState();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`${BASE_URL || 'http://localhost:3001'}/users/${userId}`, {
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
    <div className="w-fit py-9 px-4 md:mt-10 md:ml-6 md:px-0 md:py-0">
      <div className="flex flex-col border justify-center items-center p-3 bg-white rounded-lg shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]">
        <div className="flex justify-center items-center space-x-4 p-3 md:p-5">
          <div className="flex justify-center items-center">
            <UserImage image={picturePath} />
          </div>
          <div className="flex flex-col space-y-2 text-black">
            <div className="flex space-x-2">
              <h1>{firstName}</h1>
              <h1>{lastName}</h1>
            </div>
            <AiOutlineUserAdd color="black" />
          </div>
        </div>
        <hr className="border border-black w-28" />
        <div className="flex flex-col justify-center items-center  space-y-3 p-3 md:p-6">
          <div className="flex space-x-4">
            <h1 className="text-gray-500">Impressions</h1>
            <h1 className="text-black">{impressions}</h1>
          </div>
          <div className="flex space-x-4">
            <h1 className="text-gray-500">Profle Views</h1>
            <h1 className="text-black">{viewwdProfile}</h1>
          </div>
        </div>
        <hr className="border border-black w-28" />
        <div className="flex space-x-5 justify-center items-center p-3 md:p-6">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <GrLocation />
            <h1 className="text-black">{loacation}</h1>
          </div>
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdWorkOutline color="black" />
            <h1 className="text-black">{occupation}</h1>
          </div>
          <div className="flex flex-col space-y-2 justify-center items-center">
            <h1 className="text-black">{friends.length}</h1>
            <h1 className="text-black">Friends</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
