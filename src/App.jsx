import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/signup";
import Signin from "./components/signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="todolist" element={<Signup/>}/>
          <Route path="signUp" element={<Signin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
