import { Form,  Button, Input} from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useContext } from 'react';
import {db} from '../../firebaseConfig';
import {collection, getDocs, query, where,} from 'firebase/firestore'
import User from '../../context/userContext';
import Image from '../../assets/Images/hero-img.gif'
const Login = () =>{
    const userdetails = useContext(User)
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(userdetails);

    const handleSubmit = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const q = query(collection(db, "cellmembers"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(ele =>{
                console.log(ele.data().email);
                const data = {
                    name: ele.data().fullname,
                    email: ele.data().email,
                    cell: ele.data().cell
                }
                userdetails.setUserData(data);
                localStorage.setItem('ceshepharduser', JSON.stringify(data))
            })
            // Here we will add a user to the database with the email

            console.log(user); // User object containing information about the signed-in user
          } catch (error) {
            console.log(error.message); // Error object containing information about the error
          }
    }
    return (
        <div className='login-container'>
            <div className='login-banner'>
                <img src={Image} alt="" style={{width: "100%"}} />
            </div>
            <div className='login-content'>
                <h1 style={{textAlign: 'center', padding:"30px"}}>Login Page</h1>

                <Form action="" className="login-form">
                        <div style={{padding: '10px'}}>
                            <label>Email</label>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)}  />
                        </div>
                    
                        <div style={{padding: '10px'}}>
                            <label>Password</label>
                            <Input value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    <Form.Item style={{padding: '10px'}}>
                        <Button type="primary" onClick={handleSubmit}>Login</Button>
                    </Form.Item>
                </Form>

            </div>

        </div>
    )
}

export default Login