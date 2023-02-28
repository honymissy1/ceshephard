import { Button, Input, Card, Select, notification } from 'antd';
import { useState } from 'react';
import { DownloadOutlined, SmileOutlined, FrownOutlined  } from '@ant-design/icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../../firebaseConfig';
import { collection, addDoc  } from 'firebase/firestore';

const CreateAdmin = () =>{

    const [api, contextHolder] = notification.useNotification();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cell, setCell] = useState('')
    const auth = getAuth();

    const handleRoleChange = (value) =>{
        console.log(value);
        setCell(value)
      }

    const handleSubmit = () =>{
        createUserWithEmailAndPassword(auth, email, phone, {
            name: name,
            phoneNumber: phone,
            
        })
        .then(async(userCredential) => {
            const user = userCredential.user;
            console.log(`User ${user.uid} created successfully.`);

            const docRef = await addDoc(collection(db, 'cellmembers'), {
                fullname: name,
                phone: phone,
                role: 'Cell Admin',
                cell: cell,
                address: '',
                meetings: [],
                cellmeeting: []
              })

              console.log(docRef);

              notification.success({
                message: "Success",
                description: "Admin successfully added for "+ cell,
                icon: (
                    <SmileOutlined
                      style={{
                        color: '#108ee9',
                      }}
                    />
                  ),
            });
          
            setName('');
            setEmail('');
            setPhone('');
            setCell('');  
        })
        .catch((error) => {
            // User registration failed
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error ${errorCode}: ${errorMessage}`);

            notification.error({
                message: "Failed",
                description: errorMessage.split(':')[1],
                duration: 4,
                icon: (
                    <FrownOutlined
                      style={{
                        color: 'red',
                      }}
                    />
                  ),
            });
        });
    }

    return (
        <div>
            <div className="headers">
              <h1>Create a Cell Admin</h1>
            </div>

            <Card className="add-member-form" type="inner" title="Create a user">
                <form action="" className='create-user'>
                    <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value) } />
                    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <Select

                    defaultValue="Cell"
                    style={{
                        flex: 1,
                        width: '100%',
                        marginBottom: '10px'
                    }}

                    options={[
                        {
                        value: 'Dunamis',
                        label: 'Dunamis',
                        },
                        {
                        value: 'Light Cell',
                        label: 'Light Cell',
                        },
                        {
                        value: 'Delight Cell',
                        label: 'Delight Cell',
                        }, 
                        {
                            value: 'Global Epignosis',
                            label: 'Global Epignosis',
                        }
                    ]}

                onChange={handleRoleChange}
                />
                    <Button onClick={handleSubmit} style={{marginTop: '15px'}} type="primary" icon={<DownloadOutlined />}>
                       Add Admin
                    </Button>
                 </form>
            </Card>

        </div>
    )
}


export default CreateAdmin;