import React, { useEffect, useMemo, useState } from "react";
import Neo4jd3 from "neo4jd3";
import "neo4jd3/dist/css/neo4jd3.css";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAllGraphData } from "../../Action";

function BeautyGraph() {
  const dispatch = useDispatch();
  const { allGraphData } = useSelector((state) => {
    console.log("allGraphData -----state", state)
    return {
      allGraphData: state.Graph.graphAllData,
    };
  });

  console.log("allgraphData", allGraphData)
  useEffect(() => {
    // console.log("dispatch(GetAllGraphData())", allGraphData)
    // if (!allGraphData || allGraphData.length === 0) {
      // console.log("dispatch(GetAllGraphData())")
      dispatch(GetAllGraphData());
    // }
  }, []);

  const data = useMemo(() => {
    return {
      results: [
        {
          data: [allGraphData],
        },
      ],
    };
  }, allGraphData);

  // console.log("allgraphData", allGraphData)
  console.log("data", data)

  useEffect(() => {
    const neo4jd3 = new Neo4jd3("#BeautyGraph", {
      minCollision: 60, //节点之间的最小距离
      maxNodes: 20, //最大节点数
      // neo4jDataUrl: '/BeautyGraph/data.json',
      neo4jData: data,
      nodeRadius: 25, //节点半径
      onNodeDoubleClick: function (node) {
        switch (node.id) {
          case "25":
            window.open(node.properties.url, "_blank");
            break;
          default:
            var maxNodes = 5,
              data = neo4jd3.randomD3Data(node, maxNodes);
            neo4jd3.updateWithD3Data(data);
            break;
        }
      },
      zoomFit: true,
      showImages: false,
    });
  }, []);

  return <div id="BeautyGraph"></div>;
}

export default BeautyGraph;
