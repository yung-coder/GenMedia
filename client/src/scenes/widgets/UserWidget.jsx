import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state/index";
import UserImage from "../../components/UserImage";
import design from "../../../public/design.jpg";
import { GrLocation } from "react-icons/gr";
import { MdWork } from "react-icons/md";

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
    <div className="border relative">
      <img src={design} alt="" className="w-full h-16" />
      <div className="flex flex-col absolute top-1/4 left-1/4 border">
        <div className="flex justify-center items-center">
          <UserImage image={picturePath} />
        </div>
        <div className="flex justify-center items-center">{firstName}</div>
        <div className="flex flex-col">
          <div className="flex space-x-4">
            <h1 className="text-gray-300">Impressions</h1>
            <h1>{impressions}</h1>
          </div>
          <div className="flex space-x-4">
            <h1 className="text-gray-300">Profle Views</h1>
            <h1 className="">{viewwdProfile}</h1>
          </div>
        </div>
        <div className="flex space-x-4 justify-center items-center">
          <div className="flex flex-col space-y-3">
            <GrLocation />
            <h1>{loacation}</h1>
          </div>
          <div className="flex flex-col space-y-3">
            <MdWork />
            <h1>{occupation}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
