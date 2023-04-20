import { Select, Cascader, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useCallback, useEffect, useState } from "react"
import "./index.css"
import { useSelector, useDispatch } from "react-redux"
import { searchNodesbyLabelsAndProperties } from "../../../../../Action"

export default function Search() {
  const dispatch = useDispatch()
  const [selectedLabels, setSelectedLabels] = useState([])
  const [selectedProperties, setSelectedProperties] = useState([])
  const [condition, setCondition] = useState({})

  const labels = useSelector((state) => state.Graph.graphAllLabel)

  const reduxProperties = useSelector(
    (state) => state.Graph.graphAllPropertiesValue
  )
  let properties = []
  if (reduxProperties) {
    properties = Object.keys(reduxProperties).map((key) => ({
      label: key,
      value: key,
      children: reduxProperties[key].map((item) => ({
        label: item,
        value: item,
      })),
    }))
  }

  const filteredOptions = labels.filter((o) => !selectedLabels.includes(o))

  const onChange = (value) => {
    setSelectedProperties(value)
  }

  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    )

  const dropdownRender = (menus) => (
    <div style={{ maxWidth: "400px" }}>{menus}</div>
  )

  const toSearchNodesbyLabelsAndProperties = () => {
    setCondition({
      labels: selectedLabels,
      properties: selectedProperties,
    })
  }

  const [mount, setMount] = useState(false) //防止第一次渲染时触发useEffect
  useEffect(() => {
    if (mount) {
      console.log("searchNodesbyLabelsAndProperties")
      dispatch(searchNodesbyLabelsAndProperties(condition))
    } else {
      setMount(true)
    }
  }, [condition])

  return (
    <div className="label-box-search">
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
        onChange={onChange} //选择后的回调
        multiple
        maxTagCount={5} //最多显示5个标签
        maxTagTextLength={8} //最多显示8个字符
        placeholder="Properties"
        showSearch={{ filter }}
        dropdownRender={dropdownRender} //自定义下拉菜单
      />
      <Button
        icon={<SearchOutlined />}
        style={{
          width: "100%",
        }}
        onClick={toSearchNodesbyLabelsAndProperties}
      >
        Search
      </Button>
    </div>
  )
}
