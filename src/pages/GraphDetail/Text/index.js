import { Table } from "antd"
import { useState } from "react"
import "./index.css"

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { GetAllGraphData } from "../../../Action"

export default function Text() {
  const dispatch = useDispatch()
  let { allGraphData } = useSelector((state) => {
    return {
      allGraphData: state.Graph.graphAllData,
    }
  })
  let nodes = []
  let relationships = []
  console.log("allGraphData", allGraphData)
  console.log("allGraphData.graph", allGraphData.graph)
  if (allGraphData) {
    nodes = allGraphData.graph.nodes
    relationships = allGraphData.graph.relationships
  }

  const nodesColumns = [
    {
      title: "Labels",
      dataIndex: "labels",
      render: (properties) => JSON.stringify(properties),
    },
    {
      title: "Properties",
      dataIndex: "properties",
      render: (properties) => JSON.stringify(properties),
    },
  ]
  const relationshipsColumns = [
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Start Node",
      dataIndex: "startNode",
    },
    {
      title: "End Node",
      dataIndex: "endNode",
    },
    {
      title: "Properties",
      dataIndex: "properties",
      render: (properties) => JSON.stringify(properties),
    },
  ]

  const [showNodes, setShowNodes] = useState(true)
  return (
    <>
      <div>
        <span></span>
        <span className="switch">
          <span
            id="show-nodes-button"
            className={showNodes ? "selected" : ""}
            onClick={() => setShowNodes(true)}
          >
            Nodes
          </span>
          <span
            id="show-relationships-button"
            className={!showNodes ? "selected" : ""}
            onClick={() => setShowNodes(false)}
          >
            Relationship
          </span>
        </span>
      </div>
      <div className="text">
        {showNodes ? (
          <Table
            dataSource={nodes}
            columns={nodesColumns}
            pagination={{ pageSize: 5 }}
          />
        ) : (
          <Table
            dataSource={relationships}
            columns={relationshipsColumns}
            pagination={{ pageSize: 5 }}
          />
        )}
      </div>
    </>
  )
}
