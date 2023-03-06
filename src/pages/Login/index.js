import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons"
import { Input, Select, Button } from "antd"
import "./index.css"

const { Option } = Select

/**
 *  登录页面路由组件
 */
export default function Login() {
  return (
    <>
      <div className="login-box">
        <div>
          <div className="login-front-title">Connect to Neo4j</div>
          <div className="input-box">
            <fieldset className="login-contain">
              <div style={{ padding: "10px" }}>
                <div className="login-title">Connect URL</div>
                <Input.Group compact>
                  <Select defaultValue="bolt://">
                    <Option value="bolt://">bolt://</Option>
                    <Option value="neo4j://">neo4j://</Option>
                  </Select>
                  <Input
                    style={{
                      width: "72%",
                    }}
                    defaultValue="localhost:7687"
                  />
                </Input.Group>
                <div className="login-title">Username</div>
                <Input placeholder="Username" prefix={<UserOutlined />} />
                <div className="login-title">Password</div>
                <Input.Password
                  placeholder="Password"
                  prefix={<KeyOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                <div className="login-button">
                  <Button
                    type="primary"
                    size="primary"
                    style={{ display: "block", width: "100%" }}
                  >
                    Connect
                  </Button>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  )
}
