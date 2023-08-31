import {   Button, Card, message, Tabs, DatePicker, Table, Select, Space, Dropdown, Menu, Input } from 'antd';
import { useState, useContext, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { DeleteTwoTone, DownOutlined, CheckCircleTwoTone, PhoneFilled } from '@ant-design/icons';
import { collection, doc, query, where, getDocs, updateDoc, collectionGroup, writeBatch, getDoc} from 'firebase/firestore';
import User from '../../context/userContext';

const MarkAttendance = () =>{
  const userdetails = useContext(User);
  const [meetingList, setMeetingList] = useState([])
   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   const [meetingData, setMeetingData] = useState([]);
  //  const [checked, setChecked] = useState(false);
   const [meetingTitle, setMeetingTitle] = useState('');
  //  const [absentData, setAbsentData] = useState([]);
  //  const [absentUpdate, setAbsentUpdate] = useState([]);
  //  const [meeting, setMeeting] = useState('');
   const [updateArray, setUpdateArray] = useState([]);



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
     render: (text) => <a href={"tel:"+text}><PhoneFilled /></a>,
  
   }, 
 

   {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          // const isChecked = record.present;
          return record.present ? (<i style={{fontSize: '20px'}}><CheckCircleTwoTone /></i>) :(
            <p style={{color: 'red', fontWeight: '700'}}>Absent</p>
          );
        },
    },

    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: (text, record) => {
        const isChecked = selectedRowKeys.includes(record.key);
        return isChecked ? (<Input disabled />) :
        (
          <Select
          style={{
            width: '100%',
          }}
          placeholder="Reason"
          defaultValue={text} onChange={(value) => handleSelectChange(value, record.key)}>
          <Select.Option value="Travel">Travel</Select.Option>
          <Select.Option value="Work">Work</Select.Option>
          <Select.Option value="School">School</Select.Option>
          <Select.Option value="Unknown">Unknown</Select.Option>
        </Select>
        );
      },
  },
 ];



const handleSelectChange = (value, id) =>{  
const newObject = {id: id, reason: value, present: false};

let foundMatch = false;

for (let i = 0; i < updateArray.length; i++) {
  if (updateArray[i].id === newObject.id) {
    updateArray[i].reason = newObject.reason;
    updateArray[i].present = newObject.present
    foundMatch = true;
    break;
  }
}

   if (!foundMatch) {
    setUpdateArray([...updateArray, newObject])
  }

  console.log(updateArray);
}


 const handleRowSelection = (selectedRowKeys, selectedRows) => {
   setSelectedRowKeys(selectedRowKeys);
   selectedRows.map(ele =>{
    let foundMatch = false;
    for (let i = 0; i < updateArray.length; i++) {
      if (updateArray[i].id === ele.key) {
        updateArray[i].reason = '';
        updateArray[i].present = true
        foundMatch = true;
        break;
      }
    }


    if (!foundMatch) {
      setUpdateArray([...updateArray, {id: ele.key, present: true, reason: ''}])
    }
   })

   console.log(updateArray);
 };

  const data = meetingData;

   const [date, setDate] = useState('');
   
   const handleDate = (value, strVal) =>{
      console.log(strVal);
      setDate(strVal)
   }

   const meetings = [];

   const handleClick = async () =>{
      const q = query(collection(db, 'cellmembers'), where('cell', '==', userdetails.data.cell));
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

      for (const documentId of updateArray) {

          const docRef = doc(db, "cellmembers", documentId.id);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const newArray = data.meetings.map(obj => {
              if (obj.meeting === meetingTitle && obj.date === date) {

                return { ...obj, present:documentId.present, reason: documentId.reason }; 
              }

              return obj;
              
            });
            updateDoc(docRef, { meetings: newArray }).then(ele =>{
              console.log(ele);
            })
           }
          }

           location.reload()
   }

   let meetingObj = [];


   const handleMeeting = async(e) =>{
    // console.log(e.target.textContent);
    
    setMeetingTitle(e.target.textContent);
    const q = query(collection(db, 'cellmembers'), where('cell', '==', userdetails.data.cell));

    const querySnapshot = await getDocs(q);


    querySnapshot.forEach((doc) => {
      const myArray = doc.data().meetings;
      myArray.forEach((obj) => {
         if (obj.date === date && obj.meeting === e.target.textContent) {
          meetingObj.push({ fullname: doc.data().fullname, key: doc.id, phone: doc.data().phone, reason: obj.reason, present: obj.present});
         }
       });
      });

      setMeetingData(meetingObj);
  }


    return (
        <div>
           <div className="headers"><h1>Mark Attendance</h1></div>

           <Card style={{maxWidth: '600px', width: '100%', margin: '20px auto'}}>
             <DatePicker onChange={handleDate} format='DD/MM/YYYY' style={{width: '100%', marginBottom: '10px'}}/>
             <Button type="primary" onClick={handleClick} style={{width: 'auto', marginBottom: '10px'}}>Mark Attendance</Button>

           </Card>

              <Card style={{gap: '20px',width: '100%',margin: '0px auto',maxWidth: '600px',display: 'flex', justifyContent:"space-evenly"}}>
               {
                meetingList.length === 0 ? (<p style={{textAlign: 'center'}}>No meeting available, check a valid meeting date</p>) :
                meetingList.length === 1 ? (<p style={{textAlign: 'center', }}></p>) :
                 (<p style={{textAlign: 'center' }}>We have {meetingList.length} meetings today</p>)
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
                <div style={{maxWidth: '600px', width: '100%', margin: '20px auto'}}>                 
                  {/* <Tabs defaultActiveKey="1">
                      <TabPane tab="Attendance" key="1">
                       
                      </TabPane>

                      <TabPane tab="Absentees" key="2">
                       <Table columns={Columns} dataSource={absentData}  />
                       {
                        absentData.length > 0 && (
                        <Button type="primary" onClick={meetingSubmit}>
                          Submit
                        </Button>
                        )
                       }
                      </TabPane>
                  </Tabs> */}
               
                       {
                          meetingData.length > 0 && (
                          <>
                            <Table columns={presentColumns} dataSource={data}  rowSelection={{
                              type: 'checkbox',
                              onChange: handleRowSelection, selectedRowKeys,
                              }}
                              title={() => (<b>{meetingTitle}</b>)}
                              />
                            <Button onClick={handlePresent} type="primary">
                              Submit
                            </Button>
                          </>
                          )
                        }

                        {
                        meetingData.length == 1 && (
                        <>
                          <Table columns={presentColumns} dataSource={data}  rowSelection={{
                            type: 'checkbox',
                            onChange: handleRowSelection, selectedRowKeys,
                            }}
                            title={() => (<b>{meetingTitle}</b>)}
                            />
                          <Button onClick={handlePresent} type="primary">
                            Submit
                          </Button>
                        </>
                        )
                        }

                </div>
              )
            }
        </div>

     )
}


export default MarkAttendance;