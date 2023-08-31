import { Form,  Button, Input, notification} from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useContext } from 'react';
import {db} from '../../firebaseConfig';
import {collection, getDocs, query, where,} from 'firebase/firestore'
import User from '../../context/userContext';
import Image from '../../assets/Images/login.jpg'
const Login = () =>{
    const userdetails = useContext(User)
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(userdetails);

    const handleSubmit = async () => {
        // try {
        //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
        //     const user = userCredential.user;

        //     console.log(user.email);
              
        //     userdetails.setUserData(user.email);
        //     localStorage.setItem('Admin', JSON.stringify(user.email)) 

              
        //     // Here we will add a user to the database with the email

        //     console.log(user); // User object containing information about the signed-in user
        //   } 
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;


            const q = query(collection(db, "cellmembers"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);

            // console.log(querySnapshot);

            querySnapshot.forEach(ele =>{
                let data = {
                    name: ele.data().fullname,
                    email: ele.data().email,
                    cell: ele.data().cell,
                    goc: ele.data().goc
                }
                console.log(data);

                userdetails.setUserData(data.name, data.email, data.cell, data.goc);
                localStorage.setItem('ceshepharduser', JSON.stringify(data)) 
                
            })

            console.log(user); // User object containing information about the signed-in user
          } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message.split(':')[1],
                duration: 3
            })
            console.log(error.message); // Error object containing information about the error
          }
    }
    return (
        <div className='login-container'>
            <div className="overlay"></div>
            <div className='login-banner'>
                <img src={Image} alt=""  />
            </div>
            <div className='login-content'>
                <h1 style={{textAlign: 'center', padding:"30px", color: 'white'}}>Login Page</h1>

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