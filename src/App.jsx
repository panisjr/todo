import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Todolist from "./components/todolist";
import { useEffect, useState } from "react";

// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";

// import { SlowMo } from "gsap/EasePack";

// import { Flip } from "gsap/Flip";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,ScrollToPlugin,MotionPathPlugin,SlowMo);

function App() {
  const [users, setUsers] = useState([]);
  const [lists, setLists] = useState([]);
  const [userID, setID] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Signup users={users} setUsers={setUsers} />}
        />
        <Route
          path="/todolist"
          element={<Todolist lists={lists} setLists={setLists} users={users} userID={userID} />}
        />
        <Route path="signIn" element={<Signin users={users} setID={setID}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
