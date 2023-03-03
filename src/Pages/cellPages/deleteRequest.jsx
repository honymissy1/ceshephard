import { Divider, Radio, Table, Space, notification } from 'antd';
import { ArrowUpOutlined, DeleteOutlined, DeleteTwoTone, SearchOutlined} from '@ant-design/icons';
import { useState,useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { getDocs, collection, getDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';


const DeleteRequest = () =>{
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => <a href={"tel:"+text}>{text}</a>,
    },
  
    {
      title: 'Action',
      dataIndex: 'views',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record}</a> */}
          <DeleteTwoTone  onClick={() => handleDelete(record)}  twoToneColor="#eb2f96" />

        </Space>
      ),
    },
  ];

   
  const sourceCollectionRef = collection(db, "deletedmember");
  const targetCollectionRef = collection(db, "cellmembers");
  
  const onClose = () =>{
    location.reload()
  }

  const [data, setData] = useState([]);
  const handleDelete = async (x) =>{
    const sourceDocRef = doc(sourceCollectionRef, x.key);
    const sourceDocSnapshot = await getDoc(sourceDocRef);
    const sourceDocData = sourceDocSnapshot.data();

    const targetDocRef = doc(targetCollectionRef);
    const deleteDocument = await setDoc(targetDocRef, sourceDocData);
    
    const deleteCol = await deleteDoc(sourceDocRef);

    notification.open({
      duration: 3,
      message: 'Success',
      description: 'Successfully re-added',
      onClose: onClose,
    });
  }
  useEffect(() =>{
    const fetchData = async () => {
      const response = await getDocs(collection(db, 'deletedmember'));
      const dataArray = response.docs.map((doc) => ({
        key: doc.id,
        name: doc.data().fullname,
        phone: doc.data().phone,
        role: doc.data().role,
        // ...doc.data(),
      }));
      setData(dataArray);
    };
    fetchData();
  }, [])

    return (
        <div>
          <div className="headers"><h1>DELETED MEMBERS</h1></div>
 
           <div style={{marginTop: '30px'}}>
           <Table columns={columns} dataSource={data} />
           </div>
        </div>

     )
}


export default DeleteRequest;