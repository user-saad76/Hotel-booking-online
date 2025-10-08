import React,{createContext,useContext, useEffect, useState} from 'react'
import { useFetch } from '../hook/useFetch'
export const AuthContext = createContext();
function AuthProvider({children}) {
    const {data,error,loading} = useFetch('http://localhost:7000/users/me')
    const [user, setUser] = useState(null);
    useEffect(() => {
    if (data) setUser(data);
  }, [data]);


    const logout = async () => {
    await fetch("http://localhost:7000/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
     window.location.href='/'
  };

    return(
       <AuthContext.Provider value={{user:data,error,loading,logout}}> 
        {children}
      </AuthContext.Provider>
    )
}
export default AuthProvider;

 export const useAuth = ()=> useContext(AuthContext)