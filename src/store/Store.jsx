import { createContext, useContext } from "react";

const Store = createContext()

const StoreProvider =  ({children}) =>{

    const name = "sarthak"

     return(
         <Store.Provider value={{name , }}>
             {children}
         </Store.Provider>
     )
}


const useStore =()=>{
     return useContext(Store)
}

export{useStore, StoreProvider}