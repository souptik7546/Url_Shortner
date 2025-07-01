import { createContext, useContext, useEffect } from "react";
import UseFetch from "./hooks/UseFetch";
import { getCurrentUser } from "./DB/apiAuth";

const Urlcontext =createContext();

const UrlProvider=({children })=>{
   const{data: user, loading, error, fn:fetchUsers}= UseFetch(getCurrentUser)
  //  console.log(user);
   
   const isAuthenticated=user?.role==='authenticated';
useEffect(() => {
  fetchUsers()
}, [])

    return <Urlcontext.Provider value={{user,fetchUsers,loading,isAuthenticated}}>
        {children}
    </Urlcontext.Provider>
}
export const UrlState=()=>{
   return useContext(Urlcontext);
}


export default UrlProvider