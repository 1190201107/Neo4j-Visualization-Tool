import {
  InboxOutlined,
  DownloadOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons"
import { Button, message, Upload } from "antd"
import "./index.css"
import { downloadFile } from "../../../utils/download_file"
import { useDispatch, useSelector } from "react-redux"
import { ImportDataFromJsonFile } from "../../../Action"
import { useEffect, useState } from "react"

const UploadInformation = () => {
  const dispatch = useDispatch()
  const { Dragger } = Upload

  const [fileStatus, setFileStatus] = useState("")

  useEffect(() => {
    if (fileStatus == "200") {
      message.success("upload successfully.")
      setUploading(false)
    } else if (fileStatus == "500") {
      message.error("upload failed.")
      setUploading(false)
    }
  }, [fileStatus])

  // const props = {
  //   name: "file",
  //   multiple: true,
  //   //   上传的地址
  //   // action: "http://127.0.0.1:8888/upload",
  //   onRemove: (file) => {
  //     const index = fileList.indexOf(file);
  //     const newFileList = fileList.slice();
  //     newFileList.splice(index, 1);
  //     setFileList(newFileList);
  //   },
  //   beforeUpload: (file) => {
  //     const fileType = file.name.split(".").pop()
  //     if (fileType !== "json") {
  //       message.error(`上传失败：上传文件格式非.json`)
  //       return false
  //     }
  //     setFileList([...fileList, file]);
  //     return true
  //   },
  //   customRequest: (options) => {
  //     const reader = new FileReader()
  //     reader.readAsText(options.file)
  //     reader.onload = function (e) {
  //       if (JSON.parse(e.target.result) && JSON.parse(e.target.result).graph) {
  //         let fileContent = JSON.parse(e.target.result).graph
  //         dispatch(ImportDataFromJsonFile(fileContent))
  //       }
  //       // 根据接口返回值修改info状态的值

  //     }
  //   },

  //   //上传文件改变时的回调,上传中、完成、失败都会调用这个函数。
  //   onChange(info) {
  //     const { status } = info.file
  //     if (status !== "uploading") {
  //       console.log("uploading", info.file, info.fileList)
  //     }
  //     if (status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully.`)
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`)
  //     }
  //   },
  //   //当文件被拖入上传区域时执行的回调功能
  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files)
  //   },
  // }
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)
  const handleUpload = () => {
    setFileStatus("")
    const formData = new FormData()
    const file = fileList[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function (e) {
      if (JSON.parse(e.target.result) && JSON.parse(e.target.result).graph) {
        let fileContent = JSON.parse(e.target.result).graph
        console.log(fileContent)
        dispatch(
          ImportDataFromJsonFile(fileContent, setFileList, setFileStatus)
        )
      }
    }
    setUploading(true)
  }
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])
      return false
    },
    fileList,
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
        <p className="ant-upload-hint">请一次上传一个文件。</p>
      </Dragger>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length !== 1}
        loading={uploading}
        icon={<CloudUploadOutlined />}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
      <div className="download-sample-file">
        <div className="download-sample-file-title">此处下载样例文件</div>
        <Button
          type="primary"
          // shape="round"
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
