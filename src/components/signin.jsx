import React, { use, useState } from "react";
import { CiUser, CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

let id = 0;
const Signin = ({ users , setID}) => {
  const navigate = useNavigate();
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
  //   Sign In
  const signIn = () => {
    const foundUser = users.some(
      (user) => user.username === username && user.password === password
    );
    if (!foundUser) {
      Toast.fire({
        icon: "error",
        title: "Error: Make sure you have GoTyme account!",
      });
    } else {
      const find = users.find((a) => a.username === username);
      setID(find.id)
      console.log("Found: ",find.id)
      navigate("/todolist");
    }
  };
  const viewPass = (b) => {
    if (b === "unLock") {
      setView(true);
    } else if (b === "lock") {
      setView(false);
    }
  };
  return (
    <>
      <div className=" flex items-center justify-center bg-gradient-to-t from-slate-950 to-slate-800 w-screen h-screen">
        <div className="flex items-center justify-center bg-gradient-to-t from-slate-900 to-slate-700 p-5 sm:p-10 border-2 border-slate-600 rounded-md hover:shadow-lg hover:shadow-purple-400 hover:-x-6 duration-500">
          <div className="text-white ">
            <div className="flex items-center justify-center mb-10">
              <div className="pt-2 sm:pt-4">
                <p className="text-[20px] sm:text-[30px] font-bold">Sign In</p>
              </div>
            </div>
            <div className="flex flex-col gap-5  py-2 sm:py-5">
              <div className="flex items-center justify-center ">
                <CiUser className="mr-3 text-lg sm:text-2xl" />

                <label
                  htmlFor="Username"
                  className=" relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <input
                    type="text"
                    id="Username"
                    className="h-2 sm:h-8 p-5 w-[200px] sm:w-[250px] text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
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
                    <CiLock className="mr-3 text-lg sm:text-2xl" />
                    <label
                      htmlFor="Password"
                      className=" relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="text"
                        id="Password"
                        className="h-2 sm:h-8 p-5 w-[200px] sm:w-[250px] text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
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
                    <CiLock className="mr-3 text-lg sm:text-2xl" />
                    <label
                      htmlFor="Password"
                      className=" relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="password"
                        id="Password"
                        className="h-2 sm:h-8 p-5 w-[200px] sm:w-[250px] text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
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
                  <button
                    className="text-sm flex items-center justify-center gap-2 bg-slate-900 p-2 rounded-md hover:bg-purple-600 duration-300"
                    onClick={() => signIn()}
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center justify-center text-sm sm:text-md  gap-2">
              <p>Don't have an account? </p>
              <Link to={"/"}>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
