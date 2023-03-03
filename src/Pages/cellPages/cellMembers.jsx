
import { Button, Input, Space, Table, Modal, Dropdown, notification } from 'antd';
import { DeleteOutlined, DeleteTwoTone, SearchOutlined, EllipsisOutlined} from '@ant-design/icons';
import CellImage from '../../assets/Images/cell.png';
import {db} from '../../firebaseConfig';
import User from '../../context/userContext';
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc, where, query } from "firebase/firestore"; 
import { useEffect, useState, useContext } from 'react';


const CellMembers = () =>{
  const Userdetails = useContext(User);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [cell, setCell] = useState('')

  useEffect(() =>{
   setCell(Userdetails?.data?.cell)
  }, [])

  const sourceCollectionRef = collection(db, "cellmembers");
  const targetCollectionRef = collection(db, "deletedmember");
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ellipsis: true,
      render: (text) => <a href={"tel:"+text}>{text}</a>,
    },
  
    {
     title: 'Role',
     dataIndex: 'role',
     key: 'role',
     // ellipsis: true,
     responsive: ['lg'],
     render: (text) => <p style={{color: 'red'}}>{text}</p>
  
   },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      responsive: ['lg'],
    },
  
    {
      title: 'Action',
      dataIndex: 'views',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record)}>Edit</a>
          <DeleteTwoTone onClick={() => handleDelete(record)} twoToneColor="#eb2f96" />
        </Space>

      ),
    },
  ];

  const onClose = () =>{
    location.reload()
  }

  const handleDelete = async (x) =>{
    const sourceDocRef = doc(sourceCollectionRef, x.key);
    const sourceDocSnapshot = await getDoc(sourceDocRef);
    const sourceDocData = sourceDocSnapshot.data();

    const targetDocRef = doc(targetCollectionRef);
    const deleteDocument = await setDoc(targetDocRef, sourceDocData);
    
    await deleteDoc(sourceDocRef);
    notification.open({
      duration: 3,
      message: 'Success',
      description: 'Delete request successful',
      onClose: onClose,
    });
  }
  
  const showModal = (data) => {
    setModalData(data);
    setIsModalVisible(true);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'cellmembers'), where('cell', '==', Userdetails?.data?.cell === null ? '': Userdetails.data.cell));

      const response = await getDocs(q);
      const dataArray = response.docs.map((doc) => ({
        key: doc.id,
        fullname: doc.data().fullname,
        phone: doc.data().phone,
        role: doc.data().role,
        address: doc.data().address
        // ...doc.data(),
      }));
      setData(dataArray);
    };
    fetchData();
  }, [Userdetails]);

  const handleOk = () => {
    // Upadate Firebase Query :)
    setIsModalVisible(false);
  };


    return (
         <div>
           {/* <div style={{width: '100%', height:'30vh', overflow:'hidden', margin: '10px auto'}}>
            <img src={CellImage} alt="" style={{width: '100%'}}/>
           </div> */}
           <div className="headers"><h1>CELL MEMBERS</h1></div>
           <div style={{padding: '20px 0px'}}>

            <Table columns={columns} dataSource={data} />
           </div>

           <Modal title="Edit User" open={isModalVisible} onOk={handleOk} onCancel={handleOk} okText="Update User">
                {modalData && (
                  <div>
                    <label>Full Name</label>
                    <Input  value={modalData.fullname} />

                    <label>Phone</label>
                    <Input  value={modalData.phone} />
                    {/* <p>Field 1: {modalData.fullname}</p>
                    <p>Field 2: {modalData.role}</p> */}
                    {/* Add more fields as needed */}
                  </div>
                )}
            </Modal>





         </div>
        )
}


export default CellMembers;