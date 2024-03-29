import { createContext, useState, useEffect } from "react";

const User = createContext();


const UserProvider = ({children}) =>{
  const [data, setData] = useState(null);
 
  useEffect(() =>{
    const localUser = JSON.parse(localStorage.getItem('ceshepharduser'));

    if(localUser !== null){
       setData({
        name: localUser.name,
        email: localUser.email,
        cell: localUser.cell,
        goc: localUser.goc
      })
    }
  }, [])

  const setUserData = (name, email, cell, goc) =>{
     setData({ name, email, cell, goc })
  }

  return(
    <User.Provider value={{data, setUserData}}>
        {children}
    </User.Provider>
  )
}

export {UserProvider}
export default User;