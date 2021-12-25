// Import required functions.
import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
  const [userData, setUserData] = useState({name:"", lastName:"", email:"", credit:""});
  const [confirmData, setConfirmData] = useState(false);
  return(
    <UserContext.Provider value={{setUserData, userData, setConfirmData, confirmData}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;