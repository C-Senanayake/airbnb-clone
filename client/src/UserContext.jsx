import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);
    useEffect(()=>{
        if(!user){
            axios.get('/users/profile')
            .then((response)=>{
                setUser(response.data);
                setReady(true);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    },[])
    return(
        <UserContext.Provider value={{user,setUser,ready}}>
            {children} 
        </UserContext.Provider>
    )
}

// Add PropTypes validation
UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};