import React from "react";
import { BASE_URL } from "../../utils/deploy";

const UserImage = ({ image }) => {
  return (
    <div className="rounded-full w-fit h-fit">
      <img
        src={`${BASE_URL || 'http://localhost:3001'}/assets/${image}`}
        alt="userimage"
        className="w-16 h-16 rounded-full"
      />
    </div>
  );
};

export default UserImage;
