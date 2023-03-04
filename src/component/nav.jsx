import User from "../context/userContext";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import Admin from "../context/admin";

const style = {
  navStyle: {
    padding: '20px',
    boxShadow: '.5px .5px 10px black',
    borderBottom: '1px solid black',
    fontFamily: 'Ubuntu'
  }
}

const Nav = ({logout}) => {
  const details = useContext(User);
  const admin = useContext(Admin)

    const auth = getAuth();
    const handleLogout = () =>{
      signOut(auth).then(() => {
       localStorage.removeItem('Admin');
       localStorage.removeItem('ceshepharduser');
       details.setUserData(null);
       details.setUserData(null);
       location.reload()
      }).catch((error) => {
        // An error occurred
        alert('errror')
      });
    }
  return (
    <div className="nav" style={style.navStyle}>
        <h1>Ceshephard</h1>

    {
      logout && (
        <button onClick={handleLogout}>Logout</button>
      )
    }
            
      
        
    </div>
  )
}

export default Nav;
