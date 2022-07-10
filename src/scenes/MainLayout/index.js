import React from "react";
import { Layout, Menu } from "antd";

import styles from "./index.module.scss";
import { NavLink } from "react-router-dom";

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Header className={styles.header}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[{
            key: "home",
            label: (
              <NavLink
                to="/"
                className={isActive =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                Home
              </NavLink>
            )
          }, {
            key: "admin",
            label: (
              <NavLink
                to="/admin"
                className={isActive =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                Admin
              </NavLink>
            )
          },]}
        />
      </Header>
      <Content className={styles.container}>
        {children}
      </Content>
    </Layout>
  )
};

export default MainLayout;
