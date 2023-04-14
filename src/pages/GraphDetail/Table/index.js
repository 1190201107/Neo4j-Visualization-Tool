import ReactJson from "react-json-view"
import "./index.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { GetAllGraphData } from "../../../Action"

export default function Table() {
  const dispatch = useDispatch()
  const { allGraphData } = useSelector((state) => {
    return {
      allGraphData: state.Graph.graphAllData,
    }
  })

  // useEffect(() => {
  //   if (!allGraphData) dispatch(GetAllGraphData())
  // }, [allGraphData])

  return (
    <>
      <div className="json-show-container">
        <ReactJson
          src={allGraphData}
          name={null}
          style={{ fontFamily: "consolas" }}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          iconStyle="square"
          indentWidth={3} //缩进宽度
          collapsed={4} //默认折叠层级
        />
      </div>
    </>
  )
}
