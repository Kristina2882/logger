import React from 'react';

export const themes = {
  light: {
    backgroundColor:  "#e5bcc4",
    textColor:  "#0f0f0f",
    buttonBackground: "Lavender", 
    inputBackground: "Gainsboro"
  },
  dark: {
    backgroundColor: "#0f0f0f",
    textColor: "#e5bcc4",
    buttonBackground: "#232b3c",
    inputBackground: "#45516d"
  }
};

export const ThemeContext = React.createContext();