import React from "react";
import TaskControl from "./components/TaskControl";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";

function App() {
  return (
    <Router>
   <div className="main">
  
    <div className="control">
    <Routes>
     <Route path="/sign-in" element={<SignIn/>}/>
     <Route path="/" element={<TaskControl/>}/>
    </Routes>
    </div>
   </div>
   </Router>
  );
}

export default App;
