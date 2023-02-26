import { Navigate } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import GraphDetail from "../pages/GraphDetail"


const routes = [
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/graphDetail',
        element: <GraphDetail />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Navigate to="/home" />
    }
]
export default routes