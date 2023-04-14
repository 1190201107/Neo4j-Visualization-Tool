import "./index.css"
import { useDispatch, useSelector } from "react-redux"
import { SetHoverState } from "../../../../../Action"
import { useMemo } from "react"
import { Card } from "antd"

const NODE = "node"
const RELATION = "relation"

function makeLabels(items, type) {
  if (type == "node") {
    return items.map((item) => {
      return (
        <div className="node-labels">{item.label + "(" + item.count + ")"}</div>
      )
    })
  } else {
    return items.map((item) => {
      console.log("item", item)
      return (
        <div className="node-labels">{item.type + "(" + item.count + ")"}</div>
      )
    })
  }
}

function makeProperties(items) {
  return Object.keys(items).map((key) => {
    return (
      <p>
        {key}: {items[key]}
      </p>
    )
  })
}

export default function Information() {
  const dispatch = useDispatch()
  const hoverState = useSelector((state) => {
    return state.Graph.hoverState
  })

  const allGraphData = useSelector((state) => {
    return state.Graph.graphAllData
  })

  const { overviewMessage, nodeCount, relationCount } = useMemo(() => {
    return {
      overviewMessage: allGraphData.countMessage,
      nodeCount: allGraphData.graph.nodes.length,
      relationCount: allGraphData.graph.relationships.length,
    }
  }, [allGraphData])

  const hoverNode = useSelector((state) => {
    return state.Graph.hoverNode
  })

  if (!hoverState) {
    return (
      <>
        <div className="information-first-title">Overview</div>
        <div style={{ padding: 10 }}>
          <div className="information-second-title">Node labels</div>
          <div className="label-box">
            {makeLabels(overviewMessage.labelsCount, NODE)}
          </div>
          <div className="information-second-title">Relation Type</div>
          <div className="label-box">
            {makeLabels(overviewMessage.typesCount, RELATION)}
          </div>
          <div className="information-second-title">
            Displaying {nodeCount} nodes,
            <br /> {relationCount} relationships.
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        {/* <div className="information-first-title">Node</div> */}

        <Card className="node-card">
          <div className="node-card-title">Node Details</div>
          <div className="node-card-content">
            <div className="node-card-label">ID:</div>
            <div className="node-card-property">{hoverNode.id}</div>
            <div className="node-card-label">Labels:</div>
            <div className="node-card-property">
              {hoverNode.labels.join(", ")}
            </div>
            <div className="node-card-label">Properties:</div>
            <div className="node-card-property">
              {makeProperties(hoverNode.properties)}
            </div>
          </div>
        </Card>
      </>
    )
  }
}
