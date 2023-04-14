import React, { useEffect } from "react"
import Neo4jd3 from "neo4jd3"
import "neo4jd3/dist/css/neo4jd3.css"
import "./index.css"
import { useDispatch, useSelector } from "react-redux"
import { GetAllGraphData, SetHoverNode, SetHoverState } from "../../Action"

function BeautyGraph() {
  const dispatch = useDispatch()
  const { allGraphData } = useSelector((state) => {
    console.log("allGraphData -----state", state)
    return {
      allGraphData: state.Graph.graphAllData,
    }
  })

  // useEffect(() => {
  //   dispatch(GetAllGraphData())
  // }, [])

  useEffect(() => {
    if (allGraphData && allGraphData.graph) {
      console.log("allGraphData", allGraphData)
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
      })
      // neo4jd3.hidePopup()
    }
  }, [allGraphData])

  return <div id="BeautyGraph"></div>
}

export default BeautyGraph
