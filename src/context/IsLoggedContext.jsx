import React, { useState, useContext } from "react";

const IsLoggedContext = React.createContext();
const UpdateIsLoggedContext = React.createContext();

export const useIsLogged = () => {
  return useContext(IsLoggedContext);
};

export const useUpdateIsLogged = () => {
  return useContext(UpdateIsLoggedContext);
};

export const isLoggedProvider = ({ value, children }) => {
  const [isLogged, setIsLogged] = useState(value);
  return (
    <IsLoggedContext.Provider value={isLogged}>
      <UpdateIsLoggedContext.Provider value={setIsLogged}>
        {children}
      </UpdateIsLoggedContext.Provider>
    </IsLoggedContext.Provider>
  );
};

export default isLoggedProvider;
