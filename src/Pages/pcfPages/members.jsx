
import { Button, Input, Space, Table, Modal , Form,  } from 'antd';
import { DeleteOutlined, DeleteTwoTone, SearchOutlined, PhoneTwoTone} from '@ant-design/icons';
import CellImage from '../../assets/Images/cell.png';
import {db} from '../../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"; 
import { useEffect, useState } from 'react';

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

  const showModal = (data) => {

    // const docRef = doc(db, "celmembers", data.id);
    console.log(data);
    setModalData(data);
    setIsModalVisible(true);
  };
  
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);


  const [name, setName] = useState();


  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  const handleOk = () => {
    // Upadate Firebase Query :)
    setIsModalVisible(false);
  };

  const handleName = (e) =>{
    setName(e.target.value)
    console.log(...modalData.fullname);
  }

    return (
         <div>
           {/* <div style={{width: '100%', height:'30vh', overflow:'hidden', margin: '10px auto'}}>
            <img src={CellImage} alt="" style={{width: '100%'}}/>
           </div> */}
           <div className="headers"><h1>CELL MEMBERS</h1></div>
           <div style={{padding: '20px'}}>

            <Table columns={columns} dataSource={data} />
           </div>

           <Modal title="Edit User" open={isModalVisible} onOk={handleOk} onCancel={handleOk} okText="Update">
                {modalData && (
                  <div>

                    <p>Name</p>
                    <Input value={modalData.fullname}
                      onClick={handleName}

                    />
                    <p>Phone</p>
                    <Input value={modalData.phone} />
                    <p>Cell</p>
                    <Input value={modalData.cell} />
                    <p>Address</p>
                    <Input value={modalData.address} />
                    <p>Email</p>
                    <Input value={modalData.email} />
                  </div>
                )}
            </Modal>





         </div>
        )
}


export default Members;