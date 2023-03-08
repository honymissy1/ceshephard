import { Space, Input, Table, Button, DatePicker, Card, Modal, notification } from 'antd';
import { useState } from 'react';
import User from '../../context/userContext';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { DownloadOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';


const Attendance = () =>{
    // const client = new Twilio('AC72f700054167c8103c03a4176d2d4846', 'b6b82112ce2089526fee6ae83a7525ad');

    const [date, setDate] = useState('');
    const [meetingList, setMeetingList] = useState([]);
    const [meetingTitle, setMeetingTitle] = useState('');
    const [tableData, setTableData] = useState([])
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { TextArea } = Input;
    

    // Modal
    const noPresent = tableData.filter(ele => ele.status === false)
    const present = tableData.filter(ele => ele.status === true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };

    const showModalPresent = () =>{
      setIsModalOpen2(true);
    }

    const handleInputChange = (e) => {
      setMessage(e.target.value);
    };

    const handleOk = async () => {
    noPresent.forEach(async (ele) =>{
      const fetchData = await fetch(`http://localhost:3000/`, {
        method: 'post',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          phone: ele.phone,
          message: message
        })
      });
      const result = await fetchData.text();
  
      console.log(result);

    })

      // twillio request.............for absentees
      // noPresent.forEach((ele) =>{
      // client.messages.create({
      //   from: 'whatsapp:+15673721021',
      //   body: message,
      //   to: `whatsapp:${ele.phone}`
      // })
      // .then(message => console.log(`WhatsApp message sent. SID: ${message.sid}`))
      // .catch(error => console.error(`Error sending WhatsApp message: ${error}`));
      // })
      //Send Back end request
      // console.log(noPresent);
      // console.log(message);
      setIsModalOpen(false);
    };

    const handleOk2 = () =>{

    present.forEach(async (ele) =>{
      const fetchData = await fetch(`http://localhost:3000/`, {
        method: 'post',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          phone: ele.phone,
          message: message
        })
      });
      const result = await fetchData.text();
  
      console.log(result);

    })
      //twilio request for present
      console.log(message);
      setIsModalOpen(false);

    }

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handleCancel2 = () => {
      setIsModalOpen2(false);
    };
    const meetings = []
    const handleClick = async () =>{

        const docsRef = collection(db, 'cellmembers');
        const querySnapshot = await getDocs(docsRef);
  
        const matchingObjects = [];
  
        querySnapshot.forEach((doc) => {
        const myArray = doc.data().meetings;
        myArray.forEach((obj) => {
           if (obj.date === date) {
              matchingObjects.push({...obj, name: doc.data().fullname});
            }
            });
          });
          
        
        matchingObjects.forEach((doc) => {
          meetings.push(doc);
        });
  
        const result = {};
  
        meetings.forEach((meeting) => {
          if (!result[meeting.meeting]) {
            result[meeting.meeting] = [meeting];
          } else {
            result[meeting.meeting].push(meeting);
          }
        });
  
         const finalResult = [];
  
        Object.keys(result).forEach((name) => {
          finalResult.push(result[name]);
        });
  
        setMeetingList(finalResult);
        console.log(finalResult);
        if(finalResult.length < 1){
          console.log('error');
          notification.error({
            message: 'Error',
            description:
              'No meeting is registered on this day.',
          });
          setError('Error: No meeting is registered on this day')
        }else{

          
        }
     }

     const handleDate = (value, strVal) =>{
        console.log(strVal);
        setDate(strVal)
     }

     const meetingObj = []
     const handleMeeting = async(e) =>{
        setMeetingTitle(e.target.textContent)
        const q =  collection(db, 'cellmembers');
        const querySnapshot = await getDocs(q);
    
    
        querySnapshot.forEach((doc) => {
          const myArray = doc.data().meetings;
          myArray.forEach((obj) => {
             if (obj.date === date && obj.meeting === e.target.textContent) {
                meetingObj.push({ fullname: doc.data().fullname, cell: doc.data().cell, status: obj.present, phone: doc.data().phone});
            }
    
          });
          });
    
         setTableData(meetingObj);
 
      }

 

      const columns = [
        {
          title: 'Name',
          dataIndex: 'fullname',
          key: 'fullname',
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
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
          ellipsis: true,
          render: (text) => <a href={"tel:"+text}>{text}</a>,

        },

        {
            title: 'Cell',
            dataIndex: 'cell',
            key: 'cell',
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <p>{text === true ? (<i style={{color: 'green'}}><CheckOutlined /></i>):(<i style={{color: 'red', fontWeight: '700'}}><CloseOutlined /></i>)}</p>,
            sorter: (a, b) => a.status.toString().localeCompare(b.status),
            defaultSortOrder: 'descend',
        }
        
      ];

    //  const handleAction = () =>{

    //  }
    return (
        <div>
             <div className="headers">
                <h1>Attendance</h1>
             </div>
        <div>
        <Card style={{padding: '20px'}}>
                {
                  meetingList.length < 1 && (
                    <h3 style={{padding: '10px 0px'}}>No meeting selected</h3>
                  )
                }
            <div style={{margin: '0px auto',maxWidth: '500px',gap:'10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DatePicker onClick={() => setError('')} onChange={handleDate} format='DD/MM/YYYY' style={{width: '100%'}} />
                <Button type='primary' onClick={handleClick}>View</Button>
             </div>
        </Card>

        <Card>
                <div>
              
                {
                  meetingList.map(ele => {
                    return <Button onClick={handleMeeting} key={ele[0].meeting} style={{width: 'content-fit',flex: '1', marginRight: '10px' }}  type="primary" >{ele[0].meeting}</Button>;
                  })
                }
                </div>
                <h2 style={{textAlign:'center', color: 'red'}}>{error}</h2>
        </Card>

        {
          tableData.length > 0 && (
            <div style={{width: '100%'}}>
              <h2 style={{textAlign: 'center', color:'green'}}>{meetingTitle}</h2>
                 <Table onClick={() => alert('Boomm')} dataSource={tableData} columns={columns} />
                 <Button onClick={showModal} style={{margin: '10px', border: '1px solid'}} type={'primary'}>Send to Absentees</Button>
                 <Button onClick={showModalPresent} style={{margin: '10px', border: '1px solid'}} type={'primary'}>Present Members </Button>

                 <Modal title="Action" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
                     <h3 style={{color:'green'}}>Send whatsapp message</h3>
                     
                        <TextArea
                        style={{
                            height: 120,
                            resize: 'none',
                            marginBottom: '20px'
                        }}

                        value={message}
                        onChange={handleInputChange} 
                        />

                </Modal>

                <Modal title="Absent" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                     <h3 style={{color:'red'}}>Send whatsapp message</h3>
                     
                        <TextArea
                        style={{
                            height: 120,
                            resize: 'none',
                            marginBottom: '20px'
                        }}

                        onChange={handleInputChange} 
                        />

                </Modal>
                </div>
            )
        }

      
       </div>
    </div>
    )
}


export default Attendance;