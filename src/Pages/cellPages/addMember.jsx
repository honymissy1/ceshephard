import { useContext, useEffect, useState, useRef } from "react";
import User from "../../context/userContext";
import { Input, Card, Select, Button } from 'antd';
const { TextArea } = Input;
import { DownloadOutlined,  } from '@ant-design/icons';
import {db} from '../../firebaseConfig';
import { collection, addDoc } from "firebase/firestore"; 


export const AddMember = () =>{
  const Userdetails = useContext(User);

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
      phone: phoneRef.current.input.value,
      role: role,
      cell: Userdetails.data.cell,
      address: addressRef.current.input.value,
      meetings: [],
      cellmeeting: []
    })
   }

    return (
        <div>
          <div className="headers"><h1>Add a member</h1></div>
           
          <Card
            style={{
           
            }}

            className="add-member-form"
           type="inner" title="Create a user">
             <form action="" className='create-user'>
                <Input placeholder="Full Name" ref={nameRef} />
                <Input placeholder="Phone" ref={phoneRef} />

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
                    },
                    {
                    value: 'Cell Leader',
                    label: 'Cell Leader',
                    }
                ]}

                onChange={handleRoleChange}
                />
                <Input disabled value={Userdetails?.data?.cell} ref={addressRef} />
                <Input placeholder="Address" ref={addressRef} />

                <Button onClick={addUser} style={{color: 'white',background: 'rgb(0,21,41)'}}>Add</Button>
             </form>
         </Card>
           </div>

     )
}
