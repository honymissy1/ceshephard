import { Divider, Radio, Table, Button } from 'antd';
import { useState } from 'react';
import { DownloadOutlined,  } from '@ant-design/icons';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Cell',
    dataIndex: 'cell',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    ellipsis: true,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    cell: 'Dunamis',
    phone: +234813043033,
  },
  {
    key: '2',
    name: 'Jim Green',
    cell: 'Light',
    phone: +23439490242,
  },
  {
    key: '3',
    name: 'Joe Black',
    cell: 'Light',
    phone: +2343934843829,
  },
];

const rowSelection = {
   onChange: (selectedRowKeys, selectedRows) => {
    selectedRows.map(ele =>{
      console.log(ele.key);
    })
   },
   getCheckboxProps: (record) => ({
     name: record.name,
   }),
 };


const DeleteRequestPage = () =>{
    return (
        <div>
             <div className="headers">
                <h1>Delete Request</h1>
             </div>
    <div>
      <div style={{padding: '20px'}}>
        <Table rowSelection={{ type: 'checkbox', ...rowSelection, }}
        columns={columns}
        dataSource={data}
        />

        <Button style={{marginTop: '15px'}} type="primary" icon={<DownloadOutlined />}>
          Delete Member
        </Button>
      </div>

      
       </div>
    </div>
    )
}


export default DeleteRequestPage;