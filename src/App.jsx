import { useState } from "react";
import "./App.css";
import { GoPlus } from "react-icons/go";

function App() {
  const months = [
    'January',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'June',
    'Jul.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ]
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  return (
    <>
      <div className="flex items-center justify-center bg-gradient-to-t from-slate-700 to-slate-600 p-5  border-2 border-slate-600 shadow-xl shadow-slate-500 rounded-md">
        <div className="text-white ">
          <div className="flex flex-col items-start py-10">
            <p>{`${days[(new Date()).getDate()]}`}</p>
            {`${months[(new Date()).getMonth()]} ${(new Date()).getDate()}, ${(new Date()).getFullYear()}`}
          </div>
          <div className="flex items-center gap-2 my-3">
            <label
              htmlFor="Username"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="text"
                id="Username"
                className="h-8 p-3 text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                placeholder="Username"
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#3f4d61] p-0.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Username
              </span>
            </label>
            <GoPlus className="text-2xl text-slate-700 bg-slate-100 hover:bg-[#3f4d61] hover:text-white  duration-300 rounded cursor-pointer" />
          </div>
          <div className="flex flex-col items-center justify-center py-5">
            <img className="w-20" src="/latte-art.png" alt="Latte" />
            <p>Time to chill! You have no todos.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
