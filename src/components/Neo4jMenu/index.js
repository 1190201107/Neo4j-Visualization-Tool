import {
	ContainerOutlined,
	DesktopOutlined,
	PieChartOutlined,
} from "@ant-design/icons"
import { Layout, Menu } from "antd"
import { useRoutes } from "react-router-dom"
import routes from "../../routes"
import LeftMenu from "../leftMenu"
import "./index.css"

const { Header, Content } = Layout
const items1 = [
	{ key: "1", label: "菜单一", icon: <PieChartOutlined />, to: "/option" },
	{ key: "2", label: "菜单二", icon: <DesktopOutlined />, to: "/option" },
	{ key: "3", label: "菜单三", icon: <ContainerOutlined />, to: "/option" },
]

export default function Neo4jMenu() {
	const element = useRoutes(routes)

	return (
		<Layout>
			<Header className="header">
				<div className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={["2"]}
					items={items1}
				/>
			</Header>
			<Layout id="neo4j-left-menu">
				<LeftMenu />
				<Layout style={{ padding: "0 24px 24px" }}>
					<Content>{element}</Content>
				</Layout>
			</Layout>
		</Layout>
	)
}
