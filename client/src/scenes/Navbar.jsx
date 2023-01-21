import React from "react";
import { setMode, setLogout } from "../state/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsSunFill } from "react-icons/bs";
import { BsMoonFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { DropdownMultiple, Dropdown } from "reactjs-dropdown-component";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const options = [{ label: "fakeperson", value: "fakeperson" }];

  const [value, setValue] = React.useState("fruit");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="flex justify-between bg-white p-3">
      <div className="flex space-x-3">
        <h1>GenPedia</h1>
        <div className="flex bg-gray-200 justify-center items-center px-3  rounded-lg h-fit">
          <input
            type="text"
            className="bg-gray-200 w-[140px] outline-none px-1"
            placeholder="Search..."
          />
          <AiOutlineSearch />
        </div>
      </div>
      <div className="flex justify-center items-center space-x-3">
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
    </div>
  );
};

export default Navbar;
