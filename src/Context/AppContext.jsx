import { createContext,useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({children}) {
    const [token,setToken] =useState(localStorage.getItem('token'));
    const [user, setUser] =useState(null);

    async function getUser(){
        const res =await fetch('/api/user' ,{
            method:'post',
            headers:{
                Authorization:`Bearer ${token}`,
            },
    });
    const data =await res.json();

      if(res.ok){
        setUser(data);

         }
    
    }
    useEffect(()=>{
        console.log('Token:', token);
        if (token){
          getUser();
        }
        // console.log('Effect ran!');
    }, [token]);
    useEffect(() => {
        console.log('User:', user);
    }, [user]);
    return (
    <AppContext.Provider value={{token,setToken,user ,setUser}}>
        {children}
        

    </AppContext.Provider>
    );
    
}