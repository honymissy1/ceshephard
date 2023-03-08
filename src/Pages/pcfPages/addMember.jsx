import { Button, Input, Card, Select, notification } from 'antd';
import { useState } from 'react';
import { DownloadOutlined, SmileOutlined, FrownOutlined  } from '@ant-design/icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../../firebaseConfig';
import { collection, addDoc  } from 'firebase/firestore';

const AddMember = () =>{

    const [api, contextHolder] = notification.useNotification();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('')

    const auth = getAuth();

    const handleCellChange = (value) =>{
        setCell(value)
      }

      const handleRoleChange = (value) =>{
        console.log(value);
        setRole(value)
      }

    const handleSubmit = async() =>{
      try{
        const docRef = await addDoc(collection(db, 'cellmembers'), {
            fullname: name,
            phone: phone,
            role: role,
            email: email,
            cell: cell,
            address: address,
            meetings: [],
            cellmeeting: []
          })
          console.log(docRef);
    
          notification.success({
            message: "Success",
            description: "Member successfully added for "+ cell,
            icon: (
                <SmileOutlined
                  style={{ color: '#108ee9' }}
                />
              ),
        });

        setName('');
        setEmail('');
        setPhone('');
        setCell('');  
        setRole('');
        setAddress('')
      }catch(err){
        console.log(err);
      }

          
         
 
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

                onChange={handleCellChange}
                />

                <Select

                defaultValue="Role"
                style={{
                    flex: 1,
                    width: '100%',
                    marginBottom: '10px'
                }}

                options={[
                    {
                    value: 'Member',
                    label: 'Member',
                    },
                    {
                    value: 'BSC Teacher',
                    label: 'BSC Teacher',
                    },
                    {
                    value: 'Asst Cell Leader',
                    label: 'Asst Cell Leader',
                    }, 
                    {
                        value: 'Cell Leader',
                        label: 'Cell Leader',
                    }
                ]}

                onChange={handleRoleChange}
                />

                <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

                    <Button onClick={handleSubmit} style={{marginTop: '15px'}} type="primary" icon={<DownloadOutlined />}>
                       Add Admin
                    </Button>
                 </form>
            </Card>

        </div>
    )
}


export default AddMember;