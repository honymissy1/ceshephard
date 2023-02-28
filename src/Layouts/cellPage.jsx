import { UploadOutlined, UserOutlined, DeleteOutlined, PlusSquareOutlined,  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, {useContext} from 'react';
import User from '../context/userContext';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import Nav from '../component/nav';
import { useEffect } from 'react';
const { Content, Footer, Sider } = Layout;


const CellPage = ({access}) => {
  const userdetails = useContext(User)
  const { token: { colorBgContainer },} = theme.useToken();
  const pages = ['Mark Attendance', 'Add Cell Members', 'Cell Members', 'Delete'];
  const link = ['', 'addmember', 'cellmembers', 'delete']

  return (
    <>
     <Nav />
     <Layout>
         { !userdetails.data && (
       <Sider breakpoint="md" collapsedWidth="0">
         <div className="logo" />
            <Menu
            style={{
              minHeight: '100vh'
            }}
              theme="dark"
              mode="inline"
              items={[UploadOutlined, PlusSquareOutlined, UserOutlined, DeleteOutlined].map(
                (icon, index) => ({
                  key: String(index + 1),
                  icon: React.createElement(icon),
                  label: React.innerHTML = <NavLink to={'/'+link[index]}>{pages[index]}</NavLink>
                }),
              )}
            />

       </Sider>
         )}
       <Layout>
          <Content  style={{  margin: '0'}}>
            
           {
             access ? (<Outlet />) : (<Navigate to="unauth" replace={false} />)
           }      
            
          </Content>
          <Footer style={{ textAlign: 'center',}}>
            Created By Bro Bamidele
          </Footer>
       </Layout>
     </Layout>
   </>
  );
};
export default CellPage;