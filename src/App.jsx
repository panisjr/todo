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
 
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Signup users={users} setUsers={setUsers} />}
        />
        <Route path="/todolist" element={<Todolist />} />
        <Route path="signIn" element={<Signin users={users} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
