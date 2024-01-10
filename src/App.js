import React from "react";
import Header from "./components/Header";
import TaskControl from "./components/TaskControl";

function App() {
  return (
   <div className="main">
    <Header/>
    <div className="control">
    <TaskControl/>
    </div>
   </div>
  );
}

export default App;
