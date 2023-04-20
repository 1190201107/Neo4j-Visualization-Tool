import React, { useEffect, useState } from "react"
import Neo4jd3 from "neo4jd3"
import "neo4jd3/dist/css/neo4jd3.css"
import "./index.css"
import { useDispatch, useSelector } from "react-redux"
import {
  DeleteSelectedNode,
  DeleteSelectedNodeInRedux,
  SetHoverNode,
  SetHoverState,
  GetAllLabelData,
  GetAllRelationNameData,
  GetAllPropertiesNameData,
  SetDeleteNodeBeforeMessage,
  UpdateNodeMessage,
} from "../../Action"
import EditModal from "./EditModal"
import { downloadFile } from "../../utils/download_file.js"

function BeautyGraph() {
  const dispatch = useDispatch()
  const { allGraphData } = useSelector((state) => {
    console.log("allGraphData -----state", state)
    return {
      allGraphData: state.Graph.graphAllData,
    }
  })

  const [contextMenuPosition, setContextMenuPosition] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [editModalVisible, setEditModalVisible] = useState(false)

  const handleContextMenuAction = (action) => {
    const tempNode = {
      id: selectedNode.id,
      labels: selectedNode.labels,
      properties: selectedNode.properties,
    }
    if (action === "update") {
      setEditModalVisible(true)
    } else if (action === "delete") {
      dispatch(DeleteSelectedNode(tempNode))
      dispatch(DeleteSelectedNodeInRedux(tempNode, allGraphData))
    } else if (action === "download") {
      //将tempnode转换为字节流，调用download方法
      downloadFile(JSON.stringify(tempNode), `node-id:${tempNode.id}.json`)
    }

    //更新数据
    dispatch(GetAllLabelData())
    dispatch(GetAllRelationNameData())
    dispatch(GetAllPropertiesNameData())
    handleContextMenuClose()
  }

  const UpdateNode = useSelector((state) => state.Graph.deleteNodeBeforeMessage)
  const useHandleSave = (newData) => {
    newData.id = UpdateNode.id
    console.log("newData", newData)
    dispatch(UpdateNodeMessage(newData))
    setEditModalVisible(false)
  }

  const handleContextMenuClose = () => {
    setContextMenuPosition(null)
    setSelectedNode(null)
  }

  useEffect(() => {
    if (allGraphData && allGraphData.graph) {
      // console.log("allGraphData", allGraphData)
      const neo4jd3 = new Neo4jd3("#BeautyGraph", {
        minCollision: 60, //节点之间的最小距离
        maxNodes: 20, //最大节点数
        neo4jData: {
          results: [
            {
              data: [allGraphData],
            },
          ],
        },
        nodeRadius: 25, //节点半径
        zoomFit: false,
        showImages: false,
        onNodeMouseEnter: function (node) {
          dispatch(SetHoverNode(node.id, node.labels, node.properties))
          dispatch(SetHoverState(true))
        },
        onNodeMouseLeave: function () {
          dispatch(SetHoverState(false))
        },
        //鼠标右键点击事件
        onNodeClick: function (node, event) {
          console.log("node", node)
          dispatch(
            SetDeleteNodeBeforeMessage({
              id: node.id,
              labels: node.labels,
              properties: node.properties,
            })
          )
          var div = document.getElementById("BeautyGraph")
          var reactObj = div.getBoundingClientRect() //获取元素相对于视窗的位置集合
          // console.log(reactObj.left)
          // console.log(reactObj.top)
          setContextMenuPosition({
            x: node.x + reactObj.left,
            y: node.y + reactObj.top,
          })
          setSelectedNode(node)
        },
      })
    }
  }, [allGraphData])

  return (
    <>
      <div id="BeautyGraph"></div>
      {contextMenuPosition && selectedNode && (
        <div
          className="context-menu"
          style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
        >
          <div
            className="context-menu-item"
            onClick={() => handleContextMenuAction("update")}
          >
            Update node
          </div>
          <div
            className="context-menu-item"
            onClick={() => handleContextMenuAction("delete")}
          >
            Delete node
          </div>
          <div
            className="context-menu-item"
            onClick={() => handleContextMenuAction("download")}
          >
            Download
          </div>
          <div
            className="context-menu-item"
            onClick={() => handleContextMenuClose()}
          >
            close
          </div>
        </div>
      )}
      <EditModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onSave={useHandleSave}
        // data={data}
      />
    </>
  )
}

export default BeautyGraph
