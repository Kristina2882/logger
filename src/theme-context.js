import React from 'react';

export const themes = {
  light: {
    backgroundColor:  "#e5bcc4",
    textColor:  "#0f0f0f",
    buttonBackground: "#d594a1",
    buttonTextColor: "#0f0f0f", 
    inputBackground: "#d594a1"
  },
  dark: {
    backgroundColor: "#0f0f0f",
    textColor: "#e5bcc4",
    buttonBackground: "#d594a1",
    buttonTextColor: "#261216",
    inputBackground: "#e5bcc4"
  }
};

export const ThemeContext = React.createContext();