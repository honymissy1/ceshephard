import {   Button, Card, message, Tabs, DatePicker, Table, Select, Space, Dropdown, Menu } from 'antd';
import { useState } from 'react';
import { db } from '../../firebaseConfig';
import { DeleteTwoTone, DownOutlined, CheckCircleTwoTone  } from '@ant-design/icons';
import { collection, doc, query, where, getDocs, updateDoc, collectionGroup, writeBatch, getDoc} from 'firebase/firestore';


const MarkAttendance = () =>{
  const { TabPane } = Tabs;
  const [meetingList, setMeetingList] = useState([])
   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   const [meetingData, setMeetingData] = useState([]);
   const [checked, setChecked] = useState(false);
   const [meetingTitle, setMeetingTitle] = useState('')
   const [absentData, setAbsentData] = useState([])
   const items = [
    {
      label: <p>Job</p>,
      key: '0',
    },
    {
      label: <p>Health</p>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <p>Not in Town</p>,
      key: '3',
    },
    {
      label: <p>Unknown</p>,
      key: '4',
    },
    {
      label: <p>Other</p>,
      key: '5',
    },
  ];
const presentColumns = [
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
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          const isChecked = selectedRowKeys.includes(record.key);
          return isChecked ? (<i style={{fontSize: '20px'}}><CheckCircleTwoTone /></i>) :(
            <h3>Absent</h3>
          );
        },
    },
  
 ];

 const Columns = [
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
       title: 'Status',
       dataIndex: 'status',
       key: 'status',
       render: (text, record) => {
         const isChecked = selectedRowKeys.includes(record.key);
         return isChecked ? (<i style={{fontSize: '20px'}}><CheckCircleTwoTone /></i>) :(
          <Select
          defaultValue="Travelled"
          style={{
            width: 120,
          }}
          // onChange={handleChange}
          options={[
            {
              value: 'Travelled',
              label: 'Travelled',
            },
            {
              value: 'Sick',
              label: 'Sick',
            },
            {
              value: 'Job/Work',
              label: 'Job/Work',
            },
            {
              value: 'School',
              label: 'School',
            },

            {
              value: 'Unknown',
              label: 'Unknown',
            },
          ]}
        />
         );
       },
   },
 
];


 const handleRowSelection = (selectedRowKeys, selectedRows) => {
   setSelectedRowKeys(selectedRowKeys);
   
   console.log(selectedRowKeys);
 };

 const data = meetingData;

   const [date, setDate] = useState('');
   
   const handleDate = (value, strVal) =>{
      console.log(strVal);
      setDate(strVal)
   }

   const meetings = [];

   const handleClick = async () =>{
      const q = query(collection(db, 'cellmembers'), where('cell', '==', 'Dunamis'));
      const querySnapshot = await getDocs(q);

      const matchingObjects = [];
      let messageDisplayed = false;
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

      setMeetingList(finalResult)
   }

   
   
   const handlePresent = async (e) =>{
     // I'm here..........

      for (const documentId of selectedRowKeys) {

         const docRef = doc(db, "cellmembers", documentId);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const newArray = data.meetings.map(obj => {
              if (data.cell === "Dunamis" && obj.meeting === meetingTitle && obj.date === date) {
                message.success('Successfully marked '+data.fullname, 2);
                return { ...obj, present: true };
              }
               return obj;
            });

            await updateDoc(docRef, { meetings: newArray });
           }

          }

          location.reload()
   }

   let meetingObj = [];
   let absentObj = [];
   const handleMeeting = async(e) =>{
    setMeetingTitle(e.target.textContent)
    const q = query(collection(db, 'cellmembers'), where('cell', '==', 'Dunamis'));
    const querySnapshot = await getDocs(q);


    querySnapshot.forEach((doc) => {
      const myArray = doc.data().meetings;
      myArray.forEach((obj) => {
         if (obj.date === date && obj.meeting === e.target.textContent && obj.present === false) {
          meetingObj.push({ fullname: doc.data().fullname, key: doc.id, phone: doc.data().phone});
         }else if(obj.date === date && obj.meeting === e.target.textContent && obj.present === false){
          absentObj.push({ fullname: doc.data().fullname, key: doc.id, phone: doc.data().phone});   
         }

      });
      });

    setMeetingData(meetingObj);
    setAbsentData(absentObj)
    

  }

  const meetingSubmit = () =>{

  }


    return (
        <div>
           <div className="headers"><h1>Mark Attendance</h1></div>

           <Card style={{maxWidth: '600px', width: '100%', margin: '20px auto'}}>
             <DatePicker onChange={handleDate} format='DD/MM/YYYY' style={{width: '100%', marginBottom: '10px'}}/>
             <Button type="primary" onClick={handleClick}>Mark Attendance</Button>
 
           </Card>

              <Card style={{gap: '20px',width: '100%',margin: '0px auto',maxWidth: '600px',display: 'flex', justifyContent:"space-evenly"}}>
               {
                meetingList.length === 0 ? (<p style={{textAlign: 'center'}}>No meeting available, check a valid meeting date</p>) :
                meetingList.length === 1 ? (<p style={{textAlign: 'center', }}>We have {meetingList.length} meeting today</p>) :
                 (<p style={{textAlign: 'center', }}>We have {meetingList.length} meetings today</p>)
               }
                {
                  meetingList.map(nestedArray => {
                    const firstMeeting = nestedArray[0];
                    return <Button onClick={handleMeeting} style={{width: 'content-fit',flex: '1' }}  type="primary" key={firstMeeting.meeting}>{firstMeeting.meeting}</Button>;
                  })
                }



               </Card>           
            {
              meetingList.length > 0 && (
                <Card>
                {/* <Table 
                 rowSelection={{
                    type: 'checkbox',
                    onChange: handleRowSelection, selectedRowKeys,
                  }}
                 style={{width: '100%'}} columns={columns} dataSource={data} />
                 
                 <Button type="primary" onClick={meetingSubmit}>
                   Submit
                 </Button> */}
                 
                  <Tabs defaultActiveKey="1">
                      <TabPane tab="Attendance" key="1">
                        <Table columns={presentColumns} dataSource={data}  rowSelection={{
                          type: 'checkbox',
                          onChange: handleRowSelection, selectedRowKeys,
                        }} />
                        <Button onClick={handlePresent} type="primary">
                          Submit
                        </Button>
                      </TabPane>

                      <TabPane tab="Absentees" key="2">
                       <Table columns={Columns} dataSource={absentData}  />
                       <Button type="primary" onClick={meetingSubmit}>
                          Submit
                        </Button>
                      </TabPane>
                  </Tabs>
                </Card>
              )
            }
        </div>

     )
}


export default MarkAttendance;