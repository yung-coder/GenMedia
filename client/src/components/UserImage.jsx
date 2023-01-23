import React from "react";

const UserImage = ({ image }) => {
  return (
    <div className="rounded-xl">
      <img src={`http://localhost:3001/${image}`} alt="userimage" />
    </div>
  );
};

export default UserImage;
