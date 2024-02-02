import React from "react";
import TaskControl from "./components/TaskControl";
import Header from "./components/Header";

function App() {
  return (
    <React.Fragment>
      <div className="main">
        <Header />

      <div className="control">
        <TaskControl />
      </div>
      </div>
    </React.Fragment>
  );
}

export default App;
