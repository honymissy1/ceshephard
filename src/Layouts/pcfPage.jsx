import {CheckCircleOutlined, UploadOutlined, UserOutlined, DeleteOutlined, PlusSquareOutlined, UserAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button, DatePicker, Input, Card } from 'antd';
import React, {useContext} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Nav from '../component/nav';
import Admin from '../context/admin';
const { Content, Footer, Sider } = Layout;
const PcfPage = () => {
  const Admindetails = useContext(Admin)
  const [login, setLogin] = useState(false)
  const { token: { colorBgContainer },} = theme.useToken();

  const pages = ['Create Meeting', 'Attendance', 'Add Members', 'Members', 'Create Admin', 'Delete Request'];
  const link = ['','attendance', 'addmember',  'members', 'createadmin', 'deleterequest']
  
  useEffect(() =>{
   if(Admindetails.data !== null){
    setLogin(true)
   }
  }, [Admindetails])
  
  return (
    <>
    <Nav logout={login} />
    <Layout>
    {
      login && (      <Sider breakpoint="md" collapsedWidth="0">
        <div className="logo" />
        <Menu
         style={{
          position: 'relative',
          minHeight: '100vh',
          zIndex: '10'
         }}
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={['1']}
          items={[UserOutlined, CheckCircleOutlined, PlusSquareOutlined, UserOutlined, UserAddOutlined, DeleteOutlined ].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: React.innerHTML = <NavLink to={'/pcf/'+link[index]}>{pages[index]}</NavLink>
              ,
            }),
          )}
        />
      </Sider>)
    }


      <Layout>
        <Content>   
          <Outlet />
        </Content>
        <Footer 
          style={{ 
            textAlign: 'center',
          }}
        >
          Created By Bro Bamidele
        </Footer>
      </Layout>
    </Layout>
    </>
  );
};
export default PcfPage;