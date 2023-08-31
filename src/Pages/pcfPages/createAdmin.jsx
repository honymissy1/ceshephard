import { Button, Input, Card, Select, notification } from 'antd';
import { useState } from 'react';
import { DownloadOutlined, SmileOutlined, FrownOutlined  } from '@ant-design/icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../../firebaseConfig';
import { collection, addDoc  } from 'firebase/firestore';
import GOC from '../../assets/data/goc.json'

const CreateAdmin = () =>{
    const gocs = Array.from({ length: 30 }, (_, index) => (index + 1).toString());
    const [api, contextHolder] = notification.useNotification();
    const [data, setData] = useState([])
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cell, setCell] = useState('');
    const [role, setRole] = useState([])
    const auth = getAuth();
    const [group, setGroup] = useState('');

    const handleRoleChange = (value) =>{
        console.log(value);
        setCell(value)
      }

      const handleCellChange = (value) =>{
        setCell(value);
        console.log(value);
      }

      const handleChange = (value) =>{
        setRole(value)
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
                role: role,
                email: email,
                goc: group,
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
            setGroup('');
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

    const handleGroupChange = (value) =>{
      setGroup(value);

      const data = GOC.find(ele =>{
        return ele.id === value
      });

      setData(data.cells)
      console.log(data.cells);


      console.log(role);
    }

    return (
        <div>
            <div className="headers">
              <h1>Create a Cell Admin</h1>
            </div>

            <Card className="add-member-form" type="inner" title="Add a Member">
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
                        mode="multiple"
                        allowClear
                        style={{
                          width: '100%',
                        }}
                        placeholder="Designation"
                        defaultValue={[]}
                        onChange={handleChange}
                        options={[
                                 {label: 'Member', value: 'Member'},
                            
                                 {label: 'Cell Leader', value: 'cellLeader'},
                                 {label: 'BSC Teacher', value: 'bscTeacher'},
                                 {label: 'GOC leader', value: 'gocleader'},

                        ]}
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