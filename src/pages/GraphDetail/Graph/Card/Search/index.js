import { Select, Cascader, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useState } from "react"
import "./index.css"

export default function Search() {
  const [selectedLabels, setSelectedLabels] = useState([])
  const labels = ["Apples", "Nails", "Bananas", "Helicopters"]
  const filteredOptions = labels.filter((o) => !selectedLabels.includes(o))

  const properties = [
    {
      label: "Light",
      value: "light",
      children: new Array(20).fill(null).map((_, index) => ({
        label: `Number ${index}`,
        value: index,
      })),
    },
    {
      label: "name",
      value: "name",
      children: new Array(20).fill(null).map((_, index) => ({
        label: `Number ${index}`,
        value: index,
      })),
    },
  ]
  const onChange = (value) => {
    console.log(value)
  }

  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    )

  return (
    <>
      <div className="search-first-title">Search Nodes</div>
      <div className="search-second-title">Labels</div>
      <Select
        mode="multiple"
        placeholder="Labels"
        maxTagCount={5} //最多显示5个标签
        maxTagTextLength={8} //最多显示8个字符
        value={selectedLabels}
        onChange={setSelectedLabels}
        style={{
          width: "100%",
          marginBottom: "20px",
        }}
        options={filteredOptions.map((item) => ({
          value: item,
          label: item,
        }))}
      />
      <div className="search-second-title">Properties</div>
      <Cascader
        style={{
          width: "100%",
          marginBottom: "20px",
        }}
        options={properties}
        onChange={onChange}
        multiple
        maxTagCount={5} //最多显示5个标签
        maxTagTextLength={8} //最多显示8个字符
        placeholder="Properties"
        showSearch={{ filter }}
      />
      <Button
        icon={<SearchOutlined />}
        style={{
          width: "100%",
        }}
      >
        Search
      </Button>
    </>
  )
}
