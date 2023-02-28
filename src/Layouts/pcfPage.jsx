import { UploadOutlined, UserOutlined, DeleteOutlined, PlusSquareOutlined, UserAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button, DatePicker, Input, Card } from 'antd';
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Nav from '../component/nav';
const { Content, Footer, Sider } = Layout;
const PcfPage = () => {
  const { token: { colorBgContainer },} = theme.useToken();

  const pages = ['Create Meeting', 'Add Members', 'Members', 'Create Admin', 'Delete Request'];
  const link = ['', 'addmember', 'members', 'createadmin', 'deleterequest']
  return (
    <>
    <Nav />
    <Layout>

      <Sider breakpoint="md" collapsedWidth="0">
        <div className="logo" />
        <Menu
         style={{
          minHeight: '100vh'
         }}
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={['1']}
          items={[UserOutlined, PlusSquareOutlined, UserOutlined, UserAddOutlined, DeleteOutlined ].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: React.innerHTML = <NavLink to={'/pcf/'+link[index]}>{pages[index]}</NavLink>
              ,
            }),
          )}
        />
      </Sider>
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