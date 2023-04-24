import ReactJson from "react-json-view"
import "./index.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { GetAllGraphData } from "../../../Action"

export default function Table() {
  const dispatch = useDispatch()
  const { allGraphData } = useSelector((state) => {
    console.log("state.Graph.graphAllData", state.Graph.graphAllData.graph)
    return {
      allGraphData: state.Graph.graphAllData,
    }
  })

  //去掉allGraphData.graph中relation的source和target属性中的x，y，vx，vy，index属性
  // const graph = allGraphData.graph
  // if (graph && graph.relationships && graph.nodes) {
  //   graph.nodes.forEach((node) => {
  //     delete node.x
  //     delete node.y
  //     delete node.vx
  //     delete node.vy
  //     delete node.index
  //     delete node.fx
  //     delete node.fy
  //   })
  //   graph.relationships.forEach((link) => {
  //     delete link.source.x
  //     delete link.source.y
  //     delete link.source.vx
  //     delete link.source.vy
  //     delete link.source.index
  //     delete link.target.x
  //     delete link.target.y
  //     delete link.target.vx
  //     delete link.target.vy
  //     delete link.target.index
  //     delete link.linknum
  //     delete link.index
  //     delete link.startNode
  //     delete link.endNode
  //   })
  // }

  return (
    <>
      <div className="json-show-container">
        <ReactJson
          src={allGraphData.graph}
          name={null}
          style={{ fontFamily: "consolas" }}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          iconStyle="square"
          indentWidth={4} //缩进宽度
          collapsed={3} //默认折叠层级
        />
      </div>
    </>
  )
}
