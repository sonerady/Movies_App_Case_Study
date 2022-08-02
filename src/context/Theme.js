import { createContext, useState } from "react";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [isLanguage, setIsLanguage] = useState("en");

  console.log(isLanguage);

  const values = { isLanguage, setIsLanguage };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
