import { useContext, useEffect, useState, useRef } from "react";
import User from "../../context/userContext";
import { Input, Card, Select, Button } from 'antd';
const { TextArea } = Input;
import { DownloadOutlined,  } from '@ant-design/icons';
import {db} from '../../firebaseConfig';
import { collection, addDoc } from "firebase/firestore"; 


export const AddMember = () =>{
  const Userdetails = useContext(User);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('')

  const [role, setRole] = useState('');
  const nameRef = useRef();
  const roleRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const handleRoleChange = (value) =>{
    setRole(value)
  }
   const addUser = async () =>{
    const docRef = await addDoc(collection(db, 'cellmembers'), {
      fullname: nameRef.current.input.value,
      phone: phone,
      role: role,
      email: email,
      cell: Userdetails.data.cell,
      goc: Userdetails.data.goc,
      address: addressRef.current.input.value,
      meetings: [],
      cellmeeting: []
    }).then(ele =>{
      console.log('Successful');
    })
   }

    return (
        <div>
          <div className="headers"><h1>Add a member</h1></div>
           
          <Card
            style={{
           
            }}

            className="add-member-form"
           type="inner" title="Add a Member">
             <form action="" className='create-user'>
                <Input placeholder="Full Name" ref={nameRef} />
                <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {/* <Input disabled value={Userdetails?.data?.goc} ref={addressRef} /> */}
                <Select
                ref={roleRef}
                defaultValue="Choose Role"
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
                    value: 'Bibe Study Class',
                    label: 'Bibe Study Class',
                    }
                ]}

                onChange={handleRoleChange}
                />

                {/* <Input disabled value={Userdetails?.data?.cell} ref={addressRef} /> */}
                <Input placeholder="Address" ref={addressRef} />

                <Button onClick={addUser} style={{color: 'white',background: 'rgb(0,21,41)'}}>Add</Button>
             </form>
         </Card>
           </div>

     )
}
