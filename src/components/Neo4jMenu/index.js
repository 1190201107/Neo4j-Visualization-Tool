import { Layout } from "antd"
import { useRoutes } from "react-router-dom"
import routes from "../../routes"
import LeftMenu from "../leftMenu"
import GraphDetail from "../../pages/GraphDetail"
import "./index.css"

const { Content } = Layout

export default function Neo4jMenu() {
  const element = useRoutes(routes)

  return (
    <Layout>
      <Layout id="neo4j-left-menu">
        <LeftMenu />
        <Layout style={{ padding: "0 0px 24px" }}>
          {/* <GraphDetail /> */}
          <Content>{element}</Content>
        </Layout>
        {/* <Layout style={{ padding: "0 0px 24px" }}>
          <Content>
            
          </Content>
        </Layout> */}
      </Layout>
    </Layout>
  )
}
