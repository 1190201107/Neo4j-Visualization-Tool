import {
  BarsOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import { Segmented } from "antd"
import { useState } from "react"
import Information from "./Information"
import Delete from "./Delete"
import Add from "./Add"
import Search from "./Search"

const MessageCard = () => {
  const [value, setValue] = useState("Map")
  return (
    <>
      <Segmented
        // 将宽度调整为父元素宽度的选项
        block="true"
        defaultValue="Information"
        size="large"
        options={[
          {
            //   label: "Information",
            value: "Information",
            icon: <BarsOutlined />,
          },
          {
            //   label: "Add",
            value: "Add",
            icon: <EditOutlined />,
          },
          {
            //   label: "Delete",
            value: "Delete",
            icon: <DeleteOutlined />,
          },
          {
            //   label: "Search",
            value: "Search",
            icon: <SearchOutlined />,
          },
        ]}
        value={value}
        onChange={setValue}
      />
      <div>
        {value ? (
          <div>
            {value === "Information" && <Information />}
            {value === "Add" && <Add />}
            {value === "Delete" && <Delete />}
            {value === "Search" && <Search />}
          </div>
        ) : (
          {}
        )}
      </div>
    </>
  )
}

export default MessageCard
