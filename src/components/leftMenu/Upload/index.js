import { InboxOutlined, DownloadOutlined } from "@ant-design/icons"
import { Button, message, Upload } from "antd"
import "./index.css"

const { Dragger } = Upload
const props = {
  name: "file",
  multiple: true,
  //   上传的地址
  action: "https://localhost:8080/upload",
  onChange(info) {
    const { status } = info.file
    if (status !== "uploading") {
      console.log(info.file, info.fileList)
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files)
  },
}
const UploadInformation = () => (
  <div className="Upload-Information-Box">
    <div className="Upload-first-title">数据导入</div>
    <Dragger {...props} className="Upload">
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
      <p className="ant-upload-hint">支持单个或批量上传。</p>
    </Dragger>
    <div className="download-sample-file">
      <div className="download-sample-file-title">此处下载样例文件</div>
      <Button
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        size="default"
      >
        Download
      </Button>
    </div>
  </div>
)
export default UploadInformation
