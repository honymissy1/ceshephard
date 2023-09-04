
import { Button, Input, Space, Table, Modal , Form, notification,  } from 'antd';
import { DeleteOutlined, DeleteTwoTone, SearchOutlined, PhoneTwoTone} from '@ant-design/icons';
import CellImage from '../../assets/Images/cell.png';
import {db} from '../../firebaseConfig';
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore"; 
import { useEffect, useState } from 'react';
import JSON from '../../assets/data/csvjson.json'

const Members = () =>{
  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text) => <a>{text}</a>,
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
        
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search name"
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={confirm}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={confirm}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
        record.fullname.toLowerCase().includes(value.toLowerCase()),
    },

    {
     title: 'Cell',
     dataIndex: 'cell',
     key: 'cell',
     ellipsis: true,
     render: (text) => <p style={{color: 'red'}}>{text}</p>,
     filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
     <div style={{ padding: 8 }}>
        <Input
          placeholder="Search name"
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={confirm}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={confirm}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) =>
      record.cell.toLowerCase().includes(value.toLowerCase()),
  },
  
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      responsive: ['lg'],
    },

    {
      title: <i><PhoneTwoTone /></i>,
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      width: '50px',
      render: (text) => <a href={"tel:"+text}><i><PhoneTwoTone /></i></a>,
    },
  
    {
      title: 'Action',
      dataIndex: 'views',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record)}>Edit</a>
          {/* <DeleteTwoTone onClick={() => alert('Deleted '+record.fullname)} twoToneColor="#eb2f96" /> */}
        </Space>
      ),
    },
  ];

  const [id, setId] = useState('')

  const showModal = (data) => {

    // const docRef = doc(db, "celmembers", data.id);
    console.log(data.key);
    setId(data.key)
    console.log(data);
    setModalData(data);
    setIsModalVisible(true);
  };
  
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await getDocs(collection(db, 'cellmembers'));
        const dataArray = response.docs.map((doc) => ({
          key: doc.id,
          fullname: doc.data().fullname,
          phone: doc.data().phone,
          cell: doc.data().cell,
          address: doc.data().address,
          email: doc.data().email
        }));
        setName(dataArray.fullname)
        setData(dataArray);

      }catch(err){
        console.log(err);
        console.log('loading');
      }
    
    };
    fetchData();
  }, []);

  const handleOk = () => {
    // Upadate Firebase Query :)
    console.log(name, email, phone, address);

    const docRef = doc(db, 'cellmembers', id);
    const data = {
      fullname: name,
      email: email,
      address: address,
      phone : phone 
    };

// filter out empty string fields from data object
const filteredData = Object.fromEntries(
  Object.entries(data).filter(([_, value]) => value !== '')
);

     updateDoc(docRef, filteredData, {merge: true})
      .then(result =>{
        location.reload();
      }).catch((error) => {
        notification.error({
          message: 'Error',
          description: error.message
        })
      });
     setIsModalVisible(false);
  };

  const handleCancel = () =>{
    setIsModalVisible(false);
  }

  const handleName = (e) =>{
    setName(e.target.value)
    console.log(...modalData.fullname);
  }

  // const addGroup = async () =>{
  //   const data = JSON
  //   const result = data.map(async(ele) =>{
  //     const docRef = await addDoc(collection(db, 'cellmembers'), {
  //       fullname: ele['FULL NAMES'],
  //       phone: ele['PHONE NUMBER'],
  //       role: [],
  //       email: ele['EMAIL'],
  //       cell: ele.CELL,
  //       goc: ele.GOC,
  //       address: ele.ADDRESS,
  //       meetings: [],
  //       cellmeeting: []
  //     })
  //     console.log('Successful');
  //     console.log(docRef);

  //   })
  // }

    return (
         <div> 
           <div className="headers"><h1>CELL MEMBERS</h1></div>
           <div style={{padding: '20px'}}>

            {/* <Button onClick={addGroup}>Group Add</Button> */}

            <Table columns={columns} dataSource={data} />
           </div>

           <Modal title="Edit User" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Update">
                {modalData && (
                  <form>
                    <p>Name</p>
                    <Input onChange={(e) => setName(e.target.value)} placeholder={modalData.fullname} />
                    <p>Phone</p>
                    <Input onChange={(e) => setPhone(e.target.value)} placeholder={modalData.phone} />
                    <p>Address</p>
                    <Input onChange={(e) => setAddress(e.target.value)} placeholder={modalData.address} />
                    <p>Email</p>
                    <Input onChange={(e) => setEmail(e.target.value)} placeholder={modalData.email} />
                  </form>
                )}
            </Modal>


            


         </div>
        )
}


export default Members;