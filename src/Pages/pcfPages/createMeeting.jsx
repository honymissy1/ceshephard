import { Input, Card, Select, DatePicker, Button, Alert, notification  } from 'antd';
import { DownloadOutlined, SmileOutlined, FrownOutlined  } from '@ant-design/icons';

import {db} from '../../firebaseConfig';
import { useState } from 'react';
import {  collection, getDocs, setDoc, doc, arrayUnion } from 'firebase/firestore';
  
const { TextArea } = Input;

const CreateMeeting = () =>{
  // States 
  const [date, setDate] = useState('');
  const [detail, setDetails] = useState('');
  const [meeting, setMeeting] = useState('');

      const handleDate = (value, strVal) =>{
        setDate(strVal)
      }

      const meetingHandle = (value) =>{
        setMeeting(value)
      }

      const handleSubmit = async () =>{
        const querySnapshot = await getDocs(collection(db, 'cellmembers'));

        console.log(querySnapshot);
        if(!querySnapshot.empty){
          notification.success({
            message: "Success",
            duration: 4,
            description: "Meeting Created for "+ meeting+' - '+date,
            icon: (
                <SmileOutlined
                  style={{
                    color: '#108ee9',
                  }}
                />
              ),
          });
        }else{
          notification.error({
            message: "Error",
            duration: 4,
            description: <div>Meeting Not Created.. <b style={{color: 'red'}}>Try again</b></div>,
            icon: (
                <FrownOutlined style={{ color: 'red' }} />
              ),
          });
        }
        querySnapshot.forEach((docRef) => {
          setDoc(doc(db, 'cellmembers', docRef.id), { meetings: arrayUnion({
            meeting: meeting,
            date: date,
            present: false,
            reason: '',
            detail: detail
          })}, { merge: true })
            .then(() => {               
              console.log(`Successfully updated document ${docRef.id}`);
            })
            .catch((error) => {
              console.error(`Error updating document ${docRef.id}:`, error);
            });
        });
      }

    return (
      <div>
         <div className="headers">
            <h1 style={{textAlign: 'center'}}>Create Meeting</h1>
         </div>

         <Card

            className="add-member-form"
           type="inner" title="Create a meeting">
            <form action="" className='create-meeting-form'>
            <div style={{display: 'flex',  gap: '15px'}}>

            <Select
                defaultValue="Select Meeting"
                style={{
                    flex: 1,
                }}

                onChange={meetingHandle}

                options={[
                    {
                    value: 'Sunday Service',
                    label: 'Sunday Service',
                    },
                    {
                    value: 'Prayer and Prophecy Meeting',
                    label: 'Prayer and Prophecy Meeting',
                    },
                    {
                    value: 'Lunch Hour',
                    label: 'Lunch Hour',
                    },
                    {
                    value: 'Wednesday Bible Study',
                    label: 'Wednesday Bible Study',
                    },
                    {
                        value: 'Friday Prayer Meeting',
                        label: 'Friday Prayer Meeting',
                    },
                ]}
                />

                <DatePicker onChange={handleDate} format='DD/MM/YYYY'/>

                
            </div>
                <TextArea onChange={(e) => setDetails(e.target.value) } className='text-area' rows={4} placeholder="Detail" maxLength={60} />
                <Button onClick={handleSubmit} style={{marginTop: '15px'}} type="primary" icon={<DownloadOutlined />}>
                  Create Meeting
                </Button>

            </form>
         </Card>
         
      </div>
      )
}


export default CreateMeeting;