import React, { useState } from "react";
import TaskControl from "./components/TaskControl";
import { ThemeContext, themes } from "./theme-context";

function App() {
  const [theme, setTheme] = useState(themes.dark);

  document.body.style.backgroundColor = theme.backgroundColor;
  document.body.style.color = theme.textColor; 

  function toggleTheme() {
    setTheme(theme => 
      theme.textColor ===  "#e5bcc4" ? themes.light : themes.dark
    );
  }
  return (
    <ThemeContext.Provider value={theme}>
    <React.Fragment>
      <div className="main">
        <TaskControl toggleTheme = {toggleTheme}/>
      </div>
    </React.Fragment>
    </ThemeContext.Provider>
  );
}

export default App;
