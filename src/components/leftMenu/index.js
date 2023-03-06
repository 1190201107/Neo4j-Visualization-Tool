import {
  ToolOutlined,
  SettingOutlined,
  DesktopOutlined,
  QuestionCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UploadOutlined,
  NodeIndexOutlined,
  AimOutlined,
} from "@ant-design/icons"
import { Button, Menu, Layout } from "antd"
import { Link } from "react-router-dom"
import { useState } from "react"
import "./index.css"

function getItem(label, key, icon, to, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
    to,
  }
}

function renderMenu(items) {
  return items.map((item) => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} title={item.label}>
          {renderMenu(item.children)}
        </Menu.SubMenu>
      )
    }
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

const { Sider } = Layout
const items = [
  getItem("数据展示", "1", <PieChartOutlined />, "/graphDetail"),
  getItem("数据导入", "2", <DesktopOutlined />, "/import"),
  getItem("数据导出", "3", <UploadOutlined />, "/export"),
  getItem("数据库配置", "4", <SettingOutlined />, "/login"),
  getItem("数据索引", "5", <NodeIndexOutlined />, "/option9"),
  getItem("问题反馈", "6", <QuestionCircleOutlined />, "/option6"),
]

const LeftMenu = () => {
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return (
    <>
      <div id="left-menu-box">
        <Button
          id="left-menu-button"
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
            marginLeft: 16,
            marginTop: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Sider id="left-menu" trigger={null} collapsible collapsed={collapsed}>
          <Menu mode="inline" theme="dark" style={{ marginBottom: 16 }}>
            {renderMenu(items)}
          </Menu>
        </Sider>
      </div>

      <div style={{ display: "inline-block", "background-color": "white" }}>
        text=======================
      </div>
    </>
  )
}
export default LeftMenu
