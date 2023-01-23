import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state/index";
const UserWidget = ({ userId, picturePath }) => {
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
      <h1>{firstName}</h1>
    </div>
  );
};

export default UserWidget;
