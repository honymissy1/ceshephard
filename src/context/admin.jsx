import { createContext, useState, useEffect } from "react";

const Admin = createContext();


const AdminProvider = ({children}) =>{
  const [data, setData] = useState(null);
 
  useEffect(() =>{
    const localUser = JSON.parse(localStorage.getItem('Admin'));

    if(localUser !== null){
       setData({ email: localUser.email })
    }
  }, [])

  const setUserData = (email) =>{
     setData(email)
  }

  return(
    <Admin.Provider value={{data, setUserData}}>
        {children}
    </Admin.Provider>
  )
}

export {AdminProvider}
export default Admin;