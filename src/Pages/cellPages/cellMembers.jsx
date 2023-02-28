
import { Button, Input, Space, Table, Modal } from 'antd';
import { DeleteOutlined, DeleteTwoTone, SearchOutlined} from '@ant-design/icons';
import CellImage from '../../assets/Images/cell.png';
import {db} from '../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore"; 
import { useEffect, useState } from 'react';


const CellMembers = () =>{
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

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
          <DeleteTwoTone onClick={() => alert('Deleted '+record.fullname)} twoToneColor="#eb2f96" />
        </Space>
      ),
    },
  ];
  
  const showModal = (data) => {
    setModalData(data);
    setIsModalVisible(true);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getDocs(collection(db, 'cellmembers'));
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
  }, []);

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