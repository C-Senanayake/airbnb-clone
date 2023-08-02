import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    useEffect(()=>{
        if(!user){
            axios.get('/users/profile')
            .then((response)=>{
                setUser(response.data);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    },[])
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