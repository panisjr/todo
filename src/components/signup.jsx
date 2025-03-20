import React, { useState } from "react";
import { CiUser, CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

let id = 0;
const Signup = ({ users, setUsers }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  //   Sign Up
  const signUp = (username, password) => {
    const find = users.find((a) => a.username === username);
    if (find) {
      Toast.fire({
        icon: "error",
        title: "Error: Username already exist!",
      });
      console.log("Found user: ", find);
    } else if (username === "" || password === "") {
      Toast.fire({
        icon: "error",
        title: "Error: Make sure you filled all the fields!",
      });
    } else if (username && password) {
      users.push({
        id: id++,
        username: username,
        password: password,
      });
      Toast.fire({
        icon: "success",
        title: "Sign Up successfully!",
      });
      setUsername("");
      setPassword("");
    } else {
      Toast.fire({
        icon: "error",
        title: "Error: Signing Up!",
      });
    }
  };
  //   View Password
  const viewPass = (b) => {
    if (b === "unLock") {
      setView(true);
    } else if (b === "lock") {
      setView(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center bg-gradient-to-t from-slate-950 to-slate-800 w-screen h-screen p-4">
        <div className="flex items-center justify-center bg-gradient-to-t from-slate-900 to-slate-700 p-10 border-2 border-slate-600 rounded-md hover:shadow-lg hover:shadow-cyan-400 hover:-x-6 duration-500">
          <div className="bg" id="vanta"></div>
          <div className="text-white ">
            <div className="flex items-center justify-center mb-10">
              <div className="pt-4">
                <p className="text-[20px] font-bold">Sign Up</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 py-5">
              <div className="flex items-center justify-center ">
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <span className="duration-300 pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#232e42] p-0.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Username
                  </span>
                </label>
              </div>
              {view === true ? (
                <>
                  <div className="flex items-center justify-start">
                    <CiLock className="mr-3 text-2xl" />
                    <label
                      htmlFor="Password"
                      className=" relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="text"
                        id="Password"
                        className="h-8 p-5 w-[250px] text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="duration-300 pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#1c263a] p-0.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Password
                      </span>
                    </label>
                    <FaRegEye
                      className="ml-[-30px] cursor-pointer z-10"
                      onClick={() => viewPass("lock")}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-start">
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="duration-300 pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#1c263a] p-0.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Password
                      </span>
                    </label>
                    <FaRegEyeSlash
                      className="ml-[-30px] cursor-pointer z-10"
                      onClick={() => viewPass("unLock")}
                    />
                  </div>
                </>
              )}
              <button
                className="text-sm flex items-center justify-center gap-2 bg-slate-900 p-2 rounded-md hover:bg-cyan-600 duration-300"
                onClick={() => signUp(username, password)}
              >
                Sign Up
              </button>
            </div>
            <div className="flex items-center justify-center text-md gap-2">
              <p>Already have an account? </p>
              <Link to={"signIn"}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
