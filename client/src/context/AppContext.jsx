import { createContext } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext=createContext()

export const AppContextProvider =(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    const  value={
        backendUrl,
        navigate,
        token

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}


