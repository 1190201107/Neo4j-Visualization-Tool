import React from "react"
import {
  ContainerOutlined,
  AlignLeftOutlined,
  DeploymentUnitOutlined,
  DownloadOutlined,
} from "@ant-design/icons"
import { Layout, Menu } from "antd"
import { Link, Outlet } from "react-router-dom"
import MessageCard from "./Graph/Card"
import "./index.css"

const { Header, Sider, Content } = Layout
const items = [
  { key: "1", label: "Graph ", icon: <DeploymentUnitOutlined />, to: "graph" },
  { key: "2", label: "Table", icon: <AlignLeftOutlined />, to: "table" },
  { key: "3", label: "Text", icon: <ContainerOutlined />, to: "text" },
  // { key: "4", label: "Export", icon: <DownloadOutlined />, to: "option" },
]

function renderMenu(items) {
  return items.map((item) => {
    return (
      <Menu.Item key={item.key}>
        <Link to={item.to}>
          {item.icon}
          <span>{item.label}</span>
        </Link>
      </Menu.Item>
    )
  })
}

export default function GraphDetail() {
  return (
    <>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          {renderMenu(items)}
        </Menu>
      </Header>
      <Layout>
        <Content style={{ paddingLeft: 16, paddingRight: 16 }}>
          <Outlet />
        </Content>
        <Sider id="graph-card-sider" style={{ display: "flex" }} theme="light">
          <MessageCard />
        </Sider>
      </Layout>
    </>
  )
}
