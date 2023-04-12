import { Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"

export default function ExportAll() {
  function handleExport() {
    alert("export")
  }

  return (
    <>
      <span>数据库数据导出</span>
      <Button
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        size="default"
        onClick={handleExport}
      >
        Export
      </Button>
    </>
  )
}
