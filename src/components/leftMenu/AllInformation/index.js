import { useSelector, useDispatch } from "react-redux"
import "./index.css"
import { useEffect } from "react"
import {
  GetAllLabelData,
  GetAllRelationNameData,
  GetAllPropertiesNameData,
  GetAllGraphDataByLabel,
  GetAllGraphDataByRelationshipTypes,
  GetAllGraphDataByPropertyKeys,
  GetAllNodePropertyValue,
} from "../../../Action"
import { useMemo } from "react"
import { Button } from "antd"

const NODE_LABELS = "Node Labels"
const RELATIONSHIP_TYPES = "Relationship Types"
const PROEPERTY_KEYS = "Property Keys"

export default function AllInformation() {
  const dispatch = useDispatch()

  //node Labels
  const { nodeLabels, relationshipTypes, propertyKeys } = useSelector(
    (state) => {
      // console.log("state---nodeLabels", state);
      return {
        nodeLabels: state.Graph.graphAllLabel,
        relationshipTypes: state.Graph.graphAllRelationName,
        propertyKeys: state.Graph.graphAllPropertiesName,
      }
    }
  )

  useEffect(() => {
    // console.log("nodeLabels", nodeLabels);
    if (!nodeLabels) {
      dispatch(GetAllLabelData())
    }
  }, [nodeLabels])

  useEffect(() => {
    // console.log("relationshipTypes", relationshipTypes);
    if (!relationshipTypes) {
      dispatch(GetAllRelationNameData())
    }
  }, [relationshipTypes])

  useEffect(() => {
    // console.log("propertyKeys", propertyKeys);
    if (!propertyKeys) {
      dispatch(GetAllPropertiesNameData())
      dispatch(GetAllNodePropertyValue())
    }
  }, [propertyKeys])

  function makeLabels(items, type) {
    if (!items) return <div></div>
    switch (type) {
      case NODE_LABELS:
        return items.map((item) => {
          return (
            <Button
              className="node-labels"
              onClick={() => InformationOnClick(type, item)}
              type="primary"
            >
              {item}
            </Button>
          )
        })
      case RELATIONSHIP_TYPES:
        return items.map((item) => {
          return (
            <Button
              className="relationship-type"
              onClick={() => InformationOnClick(type, item)}
            >
              {item}
            </Button>
          )
        })
      case PROEPERTY_KEYS:
        return items.map((item) => {
          return (
            <Button
              className="property-keys"
              onClick={() => InformationOnClick(type, item)}
            >
              {item}
            </Button>
          )
        })
    }
  }

  const InformationOnClick = (type, item) => {
    switch (type) {
      case NODE_LABELS:
        dispatch(GetAllGraphDataByLabel(item))
        break
      case RELATIONSHIP_TYPES:
        dispatch(GetAllGraphDataByRelationshipTypes(item))
        break
      case PROEPERTY_KEYS:
        dispatch(GetAllGraphDataByPropertyKeys(item))
        break
    }
  }

  return (
    <>
      <div className="information-box">
        <div className="information-first-title">Database Information</div>
        <div style={{ padding: 5 }}>
          <div className="information-second-title">{NODE_LABELS}</div>
          <div className="label-box">{makeLabels(nodeLabels, NODE_LABELS)}</div>
          <div className="information-second-title">{RELATIONSHIP_TYPES}</div>
          <div className="label-box">
            {makeLabels(relationshipTypes, RELATIONSHIP_TYPES)}
          </div>
          <div className="information-second-title">{PROEPERTY_KEYS}</div>
          <div className="label-box">
            {makeLabels(propertyKeys, PROEPERTY_KEYS)}
          </div>
        </div>
      </div>
    </>
  )
}
