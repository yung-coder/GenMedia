import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/index";
import dropzone from "react-dropdown";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  picturePath: yup.string().required("required"),
  friends: yup.string().required("required"),
  loacation: yup.string().required("required"),
  occupation: yup.string().required("required"),
  viewwdProfile: yup.string().required("required"),
  impressions: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialRegisterValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picturePath: "",
  friends: "",
  loacation: "",
  occupation: "",
  viewwdProfile: "",
  impressions: "",
};

const initialLoginValue = {
  email: "",
  password: "",
};

const Form = () => {
  const [PageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = PageType === "login";
  const isRegister = PageType === "register";

  const handelSumbit = async (values, onSumbitProps) => {};

  return (
    <Formik
      onSubmit={handelSumbit}
      initialValues={isLogin ? initialLoginValue : initialRegisterValue}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSumbit,
        setFieldValue,
        resetFrom,
      }) => (
        <>
          {isLogin && (
            <div class="container mx-auto">
              <div class="flex justify-center px-6 my-12">
                <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                  <div
                    class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                  ></div>

                  <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 class="pt-4 text-2xl text-center">Welcome Back!</h3>
                    <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                      <div class="mb-4">
                        <label
                          class="block mb-2 text-sm font-bold text-gray-700"
                          for="username"
                        >
                          Username
                        </label>
                        <input
                          class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Username"
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
                          class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="password"
                          type="password"
                          placeholder="******************"
                        />
                        <p class="text-xs italic text-red-500">
                          Please choose a password.
                        </p>
                      </div>
                      <div class="mb-4">
                        <input
                          class="mr-2 leading-tight"
                          type="checkbox"
                          id="checkbox_id"
                        />
                        <label class="text-sm" for="checkbox_id">
                          Remember Me
                        </label>
                      </div>
                      <div class="mb-6 text-center">
                        <button
                          class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                          type="button"
                        >
                          Sign In
                        </button>
                      </div>
                      <hr class="mb-6 border-t" />
                      <div class="text-center">
                        <a
                          class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                          href="./register.html"
                        >
                          Create an Account!
                        </a>
                      </div>
                      <div class="text-center">
                        <a
                          class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                          href="./forgot-password.html"
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Formik>
  );
};

export default Form;
