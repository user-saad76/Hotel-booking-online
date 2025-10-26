import React from "react"
import { useAuth } from "../contexts/AdminAuthProvider"
import { Navigate } from "react-router"

function AdminProtected({children}) {
     const {adminUser,error,loading} = useAuth()
     
     if(loading) return <h1>Loading....</h1>
     if(error) return <h1>Something want wrong</h1>
    if(!adminUser?.fullname) return <Navigate to ={'/sign-in'} replace/>
     // if (!adminUser?.fullname) return <Navigate to="/sign-in"/>;
     
    return <>
        {children}
    </>
}
export default AdminProtected