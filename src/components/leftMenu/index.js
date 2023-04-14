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
import AllInformation from "./AllInformation"
import Upload from "./Upload"
import Download from "./Download"
import Question from "./Question"

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
  // getItem("数据展示", "1", <PieChartOutlined />, "/graphDetail"),
  // getItem("数据导入", "2", <DesktopOutlined />, "/import"),
  // getItem("数据导出", "3", <UploadOutlined />, "/export"),
  // getItem("数据库配置", "4", <SettingOutlined />, "/login"),
  // getItem("数据索引", "5", <NodeIndexOutlined />, "/option9"),
  // getItem("问题反馈", "6", <QuestionCircleOutlined />, "/option6"),
  getItem("数据展示", "1", <PieChartOutlined />, "/graphDetail"),
  getItem("数据导入", "2", <DesktopOutlined />),
  getItem("数据导出", "3", <UploadOutlined />),
  getItem("数据库配置", "4", <SettingOutlined />, "/login"),
  getItem("数据索引", "5", <NodeIndexOutlined />),
  getItem("问题反馈", "6", <QuestionCircleOutlined />),
]

const LeftMenu = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [menuIndex, setMenuIndex] = useState(1)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const [show, setShow] = useState(true)
  const [leftPageIndex, setLeftPageIndex] = useState("")

  function onSelectedFunction({ key }) {
    if (leftPageIndex != key) {
      setMenuIndex(key)
      setLeftPageIndex(key)
      setShow(true)
    } else {
      setShow(!show)
    }
    console.log("show", show)
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
          <Menu
            mode="inline"
            theme="dark"
            style={{ marginBottom: 16 }}
            // onSelect={onSelectedFunction}
            onClick={onSelectedFunction}
          >
            {renderMenu(items)}
          </Menu>
        </Sider>
      </div>

      {show ? (
        <div className="left-menu-container">
          {menuIndex == "1" && (
            <div className="flex-box">
              <AllInformation />
            </div>
          )}
          {menuIndex == "2" && (
            <div className="flex-box">
              <Upload />
            </div>
          )}
          {menuIndex == "3" && (
            <div className="flex-box">
              <Download />
            </div>
          )}
          {menuIndex == "4" && <div className="flex-box">index = 4</div>}
          {menuIndex == "5" && <div className="flex-box">index = 5</div>}
          {menuIndex == "6" && (
            <div className="flex-box">
              <Question />
            </div>
          )}
        </div>
      ) : null}
    </>
  )
}
export default LeftMenu
