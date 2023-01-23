import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state/index";
import UserImage from "../../components/UserImage";

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
    <div>
      <div className="flex flex-col">
        <div>
          <UserImage image={picturePath}/>
        </div>
        <div>
            {firstName}
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default UserWidget;
