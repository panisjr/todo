import React, { useState } from "react";
import { CiUser, CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

let id = 0;
const Signup = () => {
  return (
    <>
      <div className="flex items-center justify-center bg-gradient-to-t from-slate-950 to-slate-800 w-screen h-screen">
        <div className=" flex items-center justify-center bg-gradient-to-t from-slate-900 to-slate-700 p-10 border-2 border-slate-600 rounded-md hover:shadow-lg hover:shadow-red-400 hover:-x-6 duration-500">
          <div className="text-white ">
            <div className="flex items-center justify-center mb-10">
              <div className="pt-4">
                <p className="text-4xl">Sign Up</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 py-3">
              <div className="flex items-center justify-center">
                <CiUser className="mr-3 text-2xl" />

                <label
                  htmlFor="Username"
                  className=" relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <input
                    type="text"
                    id="Username"
                    className="h-8 p-5 w-[250px] text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                    placeholder="Username"
                  />
                  <span className="duration-300 pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#1f2a3d] p-0.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Username
                  </span>
                </label>
              </div>
              <div className="flex items-center justify-center">
                <CiLock className="mr-3 text-2xl" />

                <label
                  htmlFor="Password"
                  className=" relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <input
                    type="password"
                    id="Password"
                    className="h-8 p-5 w-[250px] text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                    placeholder="Password"
                  />
                  <FaRegEye />
                  <span className="duration-300 pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#1a2437] p-0.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Password
                  </span>
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <p>Already have an account? </p>
              <Link to={"signUp"}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
