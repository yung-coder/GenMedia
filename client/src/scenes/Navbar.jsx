import React from "react";
import { setMode, setLogout } from "../state/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  return (
    <div className="flex justify-between">
      <div>
        <h1>GenPedia</h1>
        <input type="text" />
      </div>
      <div>
        <div>

        </div>
      </div>
    </div>
  )
};

export default Navbar;
