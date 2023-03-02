import { Layout } from "antd"
import { useRoutes } from "react-router-dom"
import routes from "../../routes"
import LeftMenu from "../leftMenu"
import "./index.css"

const { Content } = Layout

export default function Neo4jMenu() {
	const element = useRoutes(routes)

	return (
		<Layout>
			<Layout id="neo4j-left-menu">
				<LeftMenu />
				<Layout style={{ padding: "0 0px 24px" }}>
					<Content>{element}</Content>
				</Layout>
			</Layout>
		</Layout>
	)
}
