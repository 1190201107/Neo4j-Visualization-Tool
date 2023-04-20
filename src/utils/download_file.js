//第一个参数是下载流，第二个参数是下载的文件名
//将从后端拿到下载流后开始下载文件
export function downloadFile(dataFlow, fileName) {
  if (dataFlow?.code === 500) {
  }
  var blob
  if (fileName.split(".")[1] === "xls") {
    blob = new Blob([dataFlow], {
      type: "application/vnd.ms-excel;charset=UTF-8",
    })
  } else {
    blob = new Blob(
      [
        new Uint8Array([0xef, 0xbb, 0xbf]), // UTF-8 BOM
        dataFlow,
      ],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    )
  }
  if ("download" in document.createElement("a")) {
    // 非IE下载
    const elink = document.createElement("a")
    elink.download = fileName
    elink.style.display = "none"
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放 URL对象
    document.body.removeChild(elink)
  }
}
