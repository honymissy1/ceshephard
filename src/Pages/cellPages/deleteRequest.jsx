import { Divider, Radio, Table, Space } from 'antd';
import { DeleteOutlined, DeleteTwoTone, SearchOutlined} from '@ant-design/icons';
import { useState } from 'react';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },

  {
    title: 'Action',
    dataIndex: 'views',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Invite {record}</a> */}
        <DeleteTwoTone  onClick={() => alert('Deleted '+record.address)}  twoToneColor="#eb2f96" />
      </Space>
    ),
  },
];
const data = [
  {
    key: '4',
    name: 'Oladeji Victor',
    address: 'Sidney No. 1 Lake Park',
  },
];

const DeleteRequest = () =>{
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