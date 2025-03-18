import React, { useState } from "react";
import { GoPlus, GoPencil } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import Swal from "sweetalert2";
import { CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <>
      <div className="flex items-center justify-center bg-gradient-to-t from-slate-950 to-slate-800 w-screen h-screen">
        <div className=" flex items-center justify-center bg-gradient-to-t from-slate-900 to-slate-700 p-10 border-2 border-slate-600 rounded-md hover:shadow-lg hover:shadow-green-400 hover:-x-6 duration-500">
          <div className="text-white ">
            <div className="flex items-center justify-between pb-3">
              <div className="pt-4">
                <p className="text-4xl">Sign In</p>
                <p className="text-sm pt-2">
                  Get things done, one item at a time.
                </p>
                <div class="relative">
                  <input
                    id="password"
                    type="password"
                    class="peer/input border rounded p-2 w-full"
                  />
                  <label
                    for="password"
                    class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    Password
                  </label>
                  <Link to="/">Sign Up</Link>
                </div>
              </div>
            </div>
            <div className="border-[1px] border-b-slate-300 "></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
