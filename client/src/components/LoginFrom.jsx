import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../state/index";
import Cover from "../../public/final-cover.jpg";
const LoginFrom = () => {
  const [inputs, setinputs] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getinputs = (data) => {
    const { value, name } = data.target;
    const input = { [name]: value };
    setinputs({ ...inputs, ...input });
  };

  const login = async (e) => {
    e.preventDefault();
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
    const loggedIn = await loggedInResponse.json();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };
  return (
    <div class="container mx-auto  mt-10">
      <div class="flex justify-center px-6 my-12 ">
        <div class="w-full xl:w-3/4 lg:w-11/12 flex">
          <div class="w-full h-auto hidden lg:block lg:w-1/2 bg-cover rounded-lg">
            <img src={Cover} alt="" className="w-full h-full"/>
          </div>

          <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 class="pt-4 text-2xl text-center">Welcome Back!</h3>
            <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={login}>
              <div class="mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-gray-700"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={getinputs}
                />
              </div>
              <div class="mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-gray-700"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  name="password"
                  onChange={getinputs}
                />
              </div>
              <div class="mb-6 text-center">
                <button
                  class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="sumbit"
                >
                  Sign In
                </button>
              </div>
              <hr class="mb-6 border-t" />
              <div class="text-center">
                <a
                  class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Create an Account!
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
