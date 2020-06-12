import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import Home from './pages/home.component';
import logo from './GitHub_Logo.png';
import './App.scss';
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout className="layout">
        <Header className="header-light">
          <div className="logo">
            <img src={logo} className="app-logo" alt="logo" />
            <div className="logo-text"> Trends</div>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
          ></Menu>
        </Header>
        <Content style={{ padding: '0 50px', minHeight: '90vh' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}> ©2020 Simon Lyttle</Footer>
      </Layout>
    </>
  );
}

export default App;
