import { InboxOutlined, DownloadOutlined } from "@ant-design/icons"
import { Button, message, Upload } from "antd"
import "./index.css"
import { downloadFile } from "../../../utils/download_file"
import { useDispatch, useSelector } from "react-redux"
import { ImportDataFromJsonFile } from "../../../Action"

const UploadInformation = () => {
  const dispatch = useDispatch()
  const { Dragger } = Upload
  const fileStatus = useSelector((state) => state.Graph.ImportDataFromJsonFile)
  const props = {
    name: "file",
    multiple: true,
    //   上传的地址
    // action: "http://localhost:8888/upload",
    // action: (file) => {
    //   dispatch(ImportDataFromJsonFile(file))
    // },
    beforeUpload: (file) => {
      const fileType = file.name.split(".").pop()
      if (fileType !== "json") {
        message.error(`上传失败：上传文件格式非.json`)
        return false
      }
      /* return new Promise((resolve,reject)=>{
          resolve(file)
      }) */
      return true
    },
    customRequest: (options) => {
      // console.log("options.file", options.file)
      const reader = new FileReader()
      reader.readAsText(options.file)
      reader.onload = function (e) {
        if (JSON.parse(e.target.result) && JSON.parse(e.target.result).graph) {
          let fileContent = JSON.parse(e.target.result).graph
          dispatch(ImportDataFromJsonFile(fileContent))
        }
      }
    },
    //上传文件改变时的回调,上传中、完成、失败都会调用这个函数。
    onChange(info) {
      const { status } = info.file
      console.log("status", status)
      if (
        status === "uploading" &&
        fileStatus === "File uploaded successfully"
      ) {
        info.file.status = "done"
      } else if (
        status === "uploading" &&
        fileStatus === "File upload failed"
      ) {
        info.file.status = "error"
      }
      if (status !== "uploading") {
        console.log("uploading", info.file, info.fileList)
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    //当文件被拖入上传区域时执行的回调功能
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files)
    },
  }

  const downloadSampleFile = () => {
    const fileName = "sample.json"
    const sampleData = {
      graph: {
        relationships: [
          { endNode: 1, id: 3, properties: {}, startNode: 2, type: "node" },
        ],
        nodes: [
          { id: 1, labels: ["Database"], properties: { name: "Neo4j" } },
          { id: 2, labels: ["Message"], properties: { name: "Hello World!" } },
        ],
      },
    }
    //将json数据转换为字节流
    downloadFile(JSON.stringify(sampleData), fileName)
  }

  return (
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
          onClick={downloadSampleFile}
        >
          Download
        </Button>
      </div>
    </div>
  )
}

export default UploadInformation
