'use client'
import {createContext,useState,useContext} from 'react'

const GlobalContext = createContext()

export function GlobalProvider({children}){
    const [unRead,setUnRead] = useState(0)
    return(
        <GlobalContext.Provider value={{
            unRead,
            setUnRead
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext(){
    return useContext(GlobalContext)
}