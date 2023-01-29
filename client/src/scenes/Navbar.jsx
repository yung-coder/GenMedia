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
      <div className="flex justify-between bg-white p-3">
        <div className="flex space-x-3">
          <h1 className="text-black">GenPedia</h1>
          <div className="hidden md:flex bg-gray-200 justify-center items-center px-3  rounded-lg h-fit">
            <input
              type="text"
              className=" bg-gray-200 w-[140px] outline-none px-1"
              placeholder="Search..."
            />
            <AiOutlineSearch />
          </div>
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
          <div className="">
            <select value={value} className="p-1 rounded-md">
              {options.map((user) => {
                return (
                  <>
                    <option value={user.value}>{user.label}</option>
                    <option value="logout">Logout</option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center cursor-pointer md:hidden">
          <GiHamburgerMenu onClick={handelToogle} />
        </div>
      </div>
      <div
        className=" absolute hidden  flex-col justify-center items-center rounded-md right-1 top-16 p-5 w-fit space-y-3 md:hidden"
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
        <div className="">
          <select value={value} className="p-1 rounded-md">
            {options.map((user) => {
              return (
                <>
                  <option value={user.value}>{user.label}</option>
                  <option value="logout">Logout</option>
                </>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default Navbar;
