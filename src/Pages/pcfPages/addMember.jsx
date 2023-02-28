import { Input, Card, Select, Button } from 'antd';
const { TextArea } = Input;
import { DownloadOutlined,  } from '@ant-design/icons';


const AddMember = () =>{
    return (
        <div>
          <div className="headers">
            <h1>Add Member</h1>
          </div>
          <Card
 
            className="add-member-form"
           type="inner" title="Create a user">
             <form action="" className='create-user'>
                <Input placeholder="Full Name" />
                <Input placeholder="Email" />
                <Input placeholder="Phone" />
                <Input placeholder="Cell" />
                <Input placeholder="Address" />
                <Button style={{marginTop: '15px'}} type="primary" icon={<DownloadOutlined />}>
                  Add Member
                </Button>
             </form>
         </Card>
         

        </div>
    )
}


export default AddMember;