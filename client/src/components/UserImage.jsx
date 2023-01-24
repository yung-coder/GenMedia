import React from "react";

const UserImage = ({ image }) => {
  return (
    <div className="rounded-full w-fit h-fit">
      <img
        src={`http://localhost:3001/assets/${image}`}
        alt="userimage"
        className="w-16 h-16 rounded-full"
      />
    </div>
  );
};

export default UserImage;
