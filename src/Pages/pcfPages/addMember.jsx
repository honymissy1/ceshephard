import { Button, Input, Card, Select, notification } from 'antd';
import { useState } from 'react';
import { DownloadOutlined, SmileOutlined, FrownOutlined  } from '@ant-design/icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../../firebaseConfig';
import { collection, addDoc  } from 'firebase/firestore';
import GOC from '../../assets/data/goc.json'

const AddMember = () =>{

    const [api, contextHolder] = notification.useNotification();
    const gocs = Array.from({ length: 30 }, (_, index) => (index + 1).toString());

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const [group, setGroup] = useState('');
    const [data, setData] = useState([])

    const auth = getAuth();

    const handleCellChange = (value) =>{
        setCell(value)
      }

      const handleRoleChange = (value) =>{
        console.log(value);
        setRole(value);

        console.log(gocs);
      }

      const handleGroupChange = (value) =>{
        setGroup(value);

        const data = GOC.find(ele =>{
          return ele.id === value
        });

        setData(data.cells)
        console.log(data.cells);
      }

    const handleSubmit = async() =>{
      try{
        const docRef = await addDoc(collection(db, 'cellmembers'), {
            fullname: name,
            phone: phone,
            role: role,
            email: email,
            cell: cell,
            goc: 'Goc'+group,
            address: address,
            meetings: [],
            cellmeeting: []
          })
          console.log(docRef);
    
          notification.success({
            message: "Success",
            description: "Member successfully added for "+ cell + ' and ' + group,
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
        setGroup('');
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
                    placeholder="GOC"
                    style={{
                        flex: 1,
                        width: '100%',
                        marginBottom: '10px'
                    }}

                    options={gocs.map((ele, index) =>({label: 'GOC'+(index +1), value: parseInt(ele)}))}

                    onChange={handleGroupChange}
                    />

                    <Select

                    defaultValue={data[0]}
                    placeholder="Cell"
                    style={{
                        flex: 1,
                        width: '100%',
                        marginBottom: '10px'
                    }}

                    options={data.map(ele => ({value: ele, label: ele}))}

                    onChange={handleCellChange}
                />


                <Select
                  placeholder="Role"
                defaultValue="Member"
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