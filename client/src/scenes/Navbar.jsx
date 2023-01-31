import React, { useState } from "react";
import { setMode, setLogout } from "../state/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsSunFill } from "react-icons/bs";
import { BsMoonFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const [open, setopen] = useState(false);
  const options = [{ label: `${user.firstName}`, value: `${user.firstName}` }];
  const Hammenu = useRef(0);

  const [value, setValue] = React.useState("");

  const handelToogle = () => {
    setopen(!open);
    if (open === true) {
      Hammenu.current.style.display = "none";
    } else {
      Hammenu.current.style.display = "flex";
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-[#FFFFF0] p-3">
        <div className="flex space-x-3">
          <h1 className="text-black font-sans text-xl font-bold">GENMEDIA</h1>
        </div>
        <div className="hidden md:flex justify-center items-center space-x-3">
          {mode === "light" ? (
            <BsMoonFill
              onClick={() => dispatch(setMode())}
              className="cursor-pointer"
            />
          ) : (
            <BsSunFill
              onClick={() => dispatch(setMode())}
              className="cursor-pointer"
            />
          )}
          {options.map((user) => {
            return (
              <select key={user} className="p-1">
                <option value={user.value} className="font-bold">
                  {user.label}
                </option>
                <option
                  value="logout"
                  className="font-bold"
                  onClick={() => dispatch(setLogout())}
                >
                  Logout
                </option>
              </select>
            );
          })}
        </div>
        <div className="flex justify-center items-center cursor-pointer md:hidden">
          <GiHamburgerMenu onClick={handelToogle} />
        </div>
      </div>
      <div
        className=" absolute hidden bg-slate-300  flex-col justify-center items-center rounded-md right-1 top-16 p-5 w-fit space-y-3 md:hidden"
        ref={Hammenu}
      >
        {mode === "light" ? (
          <BsMoonFill
            onClick={() => dispatch(setMode())}
            className="cursor-pointer"
          />
        ) : (
          <BsSunFill
            onClick={() => dispatch(setMode())}
            className="cursor-pointer"
          />
        )}
        {options.map((user) => {
          return (
            <select key={user} className="p-1"> 
              <option value={user.value}>{user.label}</option>
              <option value="logout">Logout</option>
            </select>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
