import React, {  createContext, useEffect, useState } from 'react'

export const tokenAuthContext = createContext()

function AuthContext({children}) {
    const [authStatus,setAuthStatus] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setAuthStatus(true)
        }
        else{
            setAuthStatus(false)
        }
    })
  return (
    <>
        <tokenAuthContext.Provider value={{authStatus,setAuthStatus}}>
            {children}
        </tokenAuthContext.Provider>
    </>
  )
}

export default AuthContext