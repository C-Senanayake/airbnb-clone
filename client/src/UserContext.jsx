import { createContext, useState } from "react";
import PropTypes from 'prop-types'; // Import PropTypes

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children} 
        </UserContext.Provider>
    )
}

// Add PropTypes validation
UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };