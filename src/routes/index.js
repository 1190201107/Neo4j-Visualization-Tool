import { Navigate } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Import from "../pages/Import"
import Export from "../pages/Export"
import GraphDetail from "../pages/GraphDetail"
import Graph from "../pages/GraphDetail/Graph"
import Table from "../pages/GraphDetail/Table"
import Text from "../pages/GraphDetail/Text"

const routes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/graphDetail",
    element: <GraphDetail />,
    children: [
      {
        path: "graph",
        element: <Graph />,
      },
      {
        path: "table",
        element: <Table />,
      },
      {
        path: "text",
        element: <Text />,
      },
      {
        path: "",
        element: <Navigate to="graph" />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/import",
    element: <Import />,
  },
  {
    path: "/export",
    element: <Export />,
  },
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
]
export default routes
