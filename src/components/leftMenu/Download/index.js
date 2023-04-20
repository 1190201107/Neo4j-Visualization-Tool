import { DownloadOutlined, SearchOutlined } from "@ant-design/icons"
import "./index.css"
import { Select, Cascader, Button } from "antd"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  ExportAllDataJsonFile,
  ExportNodesbyLabelsAndProperties,
} from "../../../Action"

export default function Download() {
  const dispatch = useDispatch()
  function handleExport() {
    dispatch(ExportAllDataJsonFile("All Data.json"))
  }

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

  const toExportNodesbyLabelsAndProperties = () => {
    setCondition({
      labels: selectedLabels,
      properties: selectedProperties,
    })
  }

  const [mount, setMount] = useState(false) //防止第一次渲染时触发useEffect
  useEffect(() => {
    if (mount) {
      dispatch(ExportNodesbyLabelsAndProperties("Neo4j-Data.json", condition))
    } else {
      setMount(true)
    }
  }, [condition])

  return (
    <div className="Export-div">
      <span className="Export-title">数据库数据导出</span>
      <div className="search-first-title">Export ALL In Database</div>
      <Button
        icon={<DownloadOutlined />}
        style={{
          width: "100%",
        }}
        onClick={handleExport}
      >
        Export All
      </Button>
      <div className="Export-form-list-container">
        <div className="search-first-title">Search Nodes To Export</div>
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
          icon={<DownloadOutlined />}
          style={{
            width: "100%",
          }}
          onClick={toExportNodesbyLabelsAndProperties}
        >
          Export
        </Button>
      </div>
    </div>
  )
}
