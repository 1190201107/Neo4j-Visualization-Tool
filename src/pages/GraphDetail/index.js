import React from "react"
import HighlightGraph from "../../components/HighLightGraph"
import BeautyGraph from "../../components/BeautyGraph"

export default class GraphDetail extends React.Component {
    render(){
        return (
           <div>
                {/* <HighlightGraph/> */}
                <BeautyGraph/>
           </div> 
        )
    }
}