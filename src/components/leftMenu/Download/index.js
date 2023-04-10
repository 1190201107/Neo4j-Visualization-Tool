import { Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import "./index.css"

export default function Download() {
  function handleExport() {
    alert("export")
  }

  return (
    <div className="Export-div">
      <span className="Export-title">数据库数据导出</span>
      <Button
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        size="default"
        onClick={handleExport}
      >
        Export
      </Button>
    </div>
  )
}
