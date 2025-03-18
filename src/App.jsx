import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Todolist from "./components/todolist";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup users={users} setUsers={setUsers} />} />
        <Route path="/todolist" element={<Todolist />} />
        <Route path="signIn" element={<Signin users={users}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
