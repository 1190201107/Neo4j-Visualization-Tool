import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu, Layout } from 'antd';
import { Link } from 'react-router-dom'
import { useState } from 'react';

function getItem(label, key, icon, to, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
        to,
    };
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

const { Sider } = Layout;
const items = [
    getItem('数据展示', '1', <PieChartOutlined />, '/graphDetail'),
    getItem('数据导入', '2', <DesktopOutlined />, '/login'),
    getItem('Option 3', '3', <ContainerOutlined />, '/option3'),
    getItem('Navigation One', 'sub1', <MailOutlined />, null, [
        getItem('Option 5', '5', null, '/option5'),
        getItem('Option 6', '6', null, '/option6'),
        getItem('Option 7', '7', null, '/option7'),
        getItem('Option 8', '8', null, '/option8'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, null, [
        getItem('Option 9', '9', null, '/option9'),
        getItem('Option 10', '10', null, '/option10'),
        getItem('Submenu', 'sub3', null, null, [getItem('Option 11', '11', null, '/option11'), getItem('Option 12', '12', null, '/option12')]),
    ]),
];

const LeftMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div>
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}>
                <Menu
                    mode="inline"
                    theme="dark"
                >
                    {renderMenu(items)}
                </Menu>
            </Sider  >
        </div>
    );
};
export default LeftMenu;