import React, { useEffect, useMemo, useState } from "react"
import Neo4jd3 from "neo4jd3"
import "neo4jd3/dist/css/neo4jd3.css"
import "./index.css"
import { useDispatch, useSelector } from "react-redux"
import { GetAllGraphData } from "../../Action"

function BeautyGraph() {
  const dispatch = useDispatch()
  let { allGraphData } = useSelector((state) => {
    return {
      allGraphData: state.Graph.graphAllData,
    }
  })
  const a = 1
  useEffect(() => {
    console.count("dispatch(GetAllGraphData())")
    dispatch(GetAllGraphData())
  }, allGraphData)

  const data = useMemo(() => {
    // if (allGraphData != undefined)
    //   return {
    //     results: [
    //       {
    //         data: [
    //           {
    //             graph: allGraphData.graph,
    //           },
    //         ],
    //       },
    //     ],
    //   }
    // else {
    return {
      results: [
        {
          data: [
            {
              graph: {
                nodes: [
                  {
                    id: "1",
                    labels: ["User"],
                    properties: {
                      userId: "eisman",
                    },
                  },
                  {
                    id: "8",
                    labels: ["Project"],
                    properties: {
                      name: "neo4jd3",
                      title: "neo4jd3.js",
                      description: "Neo4j graph visualization using D3.js.",
                      url: "https://eisman.github.io/neo4jd3",
                    },
                  },
                ],
                relationships: [
                  {
                    id: "7",
                    type: "DEVELOPES",
                    startNode: "1",
                    endNode: "8",
                    properties: {
                      from: 1470002400000,
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    }
    // }
  }, allGraphData)

  console.log("allgraphData", allGraphData)
  console.log("data", data)
  useEffect(() => {
    const neo4jd3 = new Neo4jd3("#BeautyGraph", {
      minCollision: 60,
      // neo4jDataUrl: '/BeautyGraph/data.json',
      neo4jData: data,
      nodeRadius: 25,
      onNodeDoubleClick: function (node) {
        switch (node.id) {
          case "25":
            window.open(node.properties.url, "_blank")
            break
          default:
            var maxNodes = 5,
              data = neo4jd3.randomD3Data(node, maxNodes)
            neo4jd3.updateWithD3Data(data)
            break
        }
      },
      zoomFit: true,
    })
  }, [])

  return <div id="BeautyGraph"></div>
}

export default BeautyGraph
