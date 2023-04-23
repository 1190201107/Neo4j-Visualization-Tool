import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons"
import { Input, Select, Button } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./index.css"
import { SubmitUserMessage, RefreshDatabase } from "../../Action"
import { useEffect } from "react"

const { Option } = Select

/**
 *  登录页面路由组件
 */
export default function Login() {
  const [urlType, setUrlType] = useState("bolt://")
  const [url, setUrl] = useState("localhost:7687")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const onChangeUrlType = (e) => {
    console.log("urlType", e)
    setUrlType(e)
  }
  const onChangeUrl = (e) => {
    console.log("url", e.target.value)
    setUrl(e.target.value)
  }
  const onChangeUsername = (e) => {
    console.log("username", e.target.value)
    setUsername(e.target.value)
  }
  const onChangePassword = (e) => {
    console.log("password", e.target.value)
    setPassword(e.target.value)
  }
  const submitUserMessageForRedux = () => {
    const finalUrl = urlType + url
    const userMessage = {
      username: username,
      password: password,
    }
    dispatch(SubmitUserMessage(finalUrl, userMessage))
    dispatch(RefreshDatabase())
  }
  // //当更新完数据库信息后，刷新数据库
  // const hasSubmit = useSelector((state) => state.Graph.submitUserMessage)
  // console.log("hasSubmit", hasSubmit)
  // useEffect(() => {
  //   if(hasSubmit === "success"){
  //     dispatch(RefreshDatabase())
  //   }
  // }, [hasSubmit])

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
                  <Select defaultValue="bolt://" 
                  onChange={onChangeUrlType}
                  >
                    <Option value="bolt://">bolt://</Option>
                    <Option value="neo4j://">neo4j://</Option>
                  </Select>
                  <Input
                    style={{
                      width: "72%",
                    }}
                    defaultValue="localhost:7687"
                    onChange={onChangeUrl}
                  />
                </Input.Group>
                <div className="login-title">Username</div>
                <Input placeholder="Username" prefix={<UserOutlined />} onChange={onChangeUsername} />
                <div className="login-title">Password</div>
                <Input.Password
                  placeholder="Password"
                  prefix={<KeyOutlined />}
                  // iconRender={(visible) =>
                  //   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  // }
                  onChange={onChangePassword}
                />
                <div className="login-button">
                  <Button
                    type="primary"
                    size="primary"
                    style={{ display: "block", width: "100%" }}
                    onClick={submitUserMessageForRedux}
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
