import { axios_instance } from "../utils/axios_instance"
import { downloadFile } from "../utils/download_file"

export const SELECT_DATE = "SELECT_DATE"
export const GET_ALL_LABEL = "GET_ALL_LABEL"
export const GET_ALL_GRAPH_DATA = "GET_ALL_GRAPH_DATA"
export const GET_ALL_RELATION_NAME = "GET_ALL_RELATION_NAME"
export const GET_ALL_PROPERTIES_NAME = "GET_ALL_PROPERTIES_NAME"
export const GET_ALL_PROPERTIES_VALUE = "GET_ALL_PROPERTIES_VALUE"
export const SET_HOVER_NODE = "SET_HOVER_NODE"
export const SET_HOVER_STATE = "SET_HOVER_STATE"
export const ADD_NODE = "ADD_NODE"
export const DELETE_NODE = "DELETE_NODE"
export const SET_DELETE_NODE_BEFORE_MESSAGE = "SET_DELETE_NODE_BEFORE_MESSAGE"
export const UPDATE_NODE = "UPDATE_NODE"
export const GET_ALL_DATA_JSON_FILE = "GET_ALL_DATA_JSON_FILE"
export const GET_DATA_BY_CONDITION_JSON_FILE = "GET_DATA_BY_CONDITION_JSON_FILE"
export const IMPORT_DATA_FROM_JSON_FILE = "IMPORT_DATA_FROM_JSON_FILE"
export const SUBMIT_USER_MESSAGE = "SUBMIT_USER_MESSAGE"
export const REFRESH_DATABASE = "REFRESH_DATABASE"

export function selectDate(newDate) {
  return async (dispatch) => {
    dispatch({ type: SELECT_DATE, data: newDate })
  }
}

export function GetAllGraphData() {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get(`/getAllGraph`)
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_GRAPH_DATA, data: res.data.data })
      } else {
        dispatch({
          type: GET_ALL_GRAPH_DATA,
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_GRAPH_DATA,
        data: [],
      })
    }
  }
}

export function GetAllLabelData() {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get(`/getAllLabel`)
      // console.log("res.data.data", res.data.data)
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_LABEL, data: res.data.data })
      } else {
        dispatch({
          type: GET_ALL_LABEL,
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_LABEL,
        data: [],
      })
    }
  }
}

export function GetAllRelationNameData() {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get(`/getAllRelationName`)
      // console.log("res.data.data", res.data.data)
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_RELATION_NAME, data: res.data.data })
      } else {
        dispatch({
          type: GET_ALL_RELATION_NAME,
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_RELATION_NAME,
        data: [],
      })
    }
  }
}

export function GetAllPropertiesNameData() {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get(`/getAllPropertiesName`)
      // console.log("res.data.data ---getAllPropertiesName", res.data.data)
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_PROPERTIES_NAME, data: res.data.data })
      } else {
        dispatch({
          type: GET_ALL_PROPERTIES_NAME,
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_PROPERTIES_NAME,
        data: [],
      })
    }
  }
}

export function GetAllNodePropertyValue() {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get(`/getAllPropertiesValue`)
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_PROPERTIES_VALUE, data: res.data.data })
      } else {
        dispatch({
          type: GET_ALL_PROPERTIES_VALUE,
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_PROPERTIES_VALUE,
        data: [],
      })
    }
  }
}

export function GetAllGraphDataByLabel(label) {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get("/searchDataByLabel", {
        params: { label: label },
      })
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_GRAPH_DATA, data: res.data.data })
      } else {
        dispatch({
          type: GET_ALL_GRAPH_DATA,
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_GRAPH_DATA,
        data: [],
      })
    }
  }
}

export function GetAllGraphDataByRelationshipTypes(relationshipType) {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get("/searchGraphByRelationType", {
        params: {
          type: relationshipType,
        },
      })
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_GRAPH_DATA, data: res.data.data })
      } else {
        dispatch({
          type: GET_ALL_GRAPH_DATA,
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_GRAPH_DATA,
        data: [],
      })
    }
  }
}

export function GetAllGraphDataByPropertyKeys(property) {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get("/searchDataByProperty", {
        params: { property: property },
      })
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_GRAPH_DATA, data: res.data.data })
      } else {
        dispatch({
          type: GET_ALL_GRAPH_DATA,
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_GRAPH_DATA,
        data: [],
      })
    }
  }
}

export function SetHoverNode(nodeId, nodeLabels, nodeProperties) {
  const node = {
    id: nodeId,
    labels: nodeLabels,
    properties: nodeProperties,
  }
  return async (dispatch) => {
    dispatch({ type: "SET_HOVER_NODE", data: node })
  }
}

export function SetHoverState(state) {
  return async (dispatch) => {
    dispatch({ type: "SET_HOVER_STATE", data: state })
  }
}

export function AddNode(node) {
  return async (dispatch) => {
    try {
      const res = await axios_instance.post("/createNodeNoRepeat", node)
      // console.log("res====addnode action", res)
      if (res.data.code === 200) {
        dispatch({ type: "ADD_NODE", data: res.message })
      } else {
        dispatch({
          type: "ADD_NODE",
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: "ADD_NODE",
        data: [],
      })
    }
  }
}

export function searchNodesbyLabelsAndProperties(condition) {
  return async (dispatch) => {
    try {
      const res = await axios_instance.post(
        "/searchDataByLabelsAndProperties",
        condition
      )
      console.log("res====searchNodesbyLabelsAndProperties action", res)
      if (res.data.code === 200) {
        dispatch({ type: "GET_ALL_GRAPH_DATA", data: res.data.data })
      } else {
        dispatch({
          type: "GET_ALL_GRAPH_DATA",
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: "GET_ALL_GRAPH_DATA",
        data: [],
      })
    }
  }
}

export function DeleteSelectedNode(node) {
  console.log("node====DeleteSelectedNode action", node)
  return async (dispatch) => {
    try {
      const res = await axios_instance.post("/deleteNode", node)
      if (res.data.code === 200) {
        dispatch({ type: "DELETE_NODE", data: res.message })
      } else {
        dispatch({
          type: "DELETE_NODE",
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: "DELETE_NODE",
        data: [],
      })
    }
  }
}

export function DeleteSelectedNodeInRedux(node, allGraphData) {
  console.log("allGraphData====DeleteSelectedNodeInRedux action", allGraphData)
  //将allGraphData中的node和node相关的关系删除
  let newAllGraphData = {
    graph: {
      nodes: [],
      relationships: [],
    },
    countMessage: {
      labelsCount: [],
      typesCount: [],
    },
  }
  if (
    allGraphData &&
    allGraphData.graph &&
    allGraphData.countMessage &&
    allGraphData.graph.nodes &&
    allGraphData.graph.relationships &&
    allGraphData.countMessage.labelsCount &&
    allGraphData.countMessage.typesCount &&
    node
  ) {
    const newNodes = allGraphData.graph.nodes.filter((item) => {
      if (item.id === node.id) {
        return false
      } else {
        return true
      }
    })
    const newRelationShip = allGraphData.graph.relationships.filter((item) => {
      if (item.startNode === node.id || item.endNode === node.id) {
        allGraphData.countMessage.typesCount.map((type) => {
          if (type.type === item.type) {
            type.count = type.count - 1
          }
        })
        return false
      } else {
        return true
      }
    })
    node.labels.map((item) => {
      allGraphData.countMessage.labelsCount.map((label) => {
        if (label.label === item) {
          label.count = label.count - 1
        }
      })
    })
    const newLabelsCount = allGraphData.countMessage.labelsCount
    const newTypesCount = allGraphData.countMessage.typesCount

    newAllGraphData = {
      graph: {
        nodes: newNodes,
        relationships: newRelationShip,
      },
      countMessage: {
        labelsCount: newLabelsCount,
        typesCount: newTypesCount,
      },
    }
  }

  console.log(
    "newAllGraphData====DeleteSelectedNodeInRedux action",
    newAllGraphData
  )
  return async (dispatch) => {
    dispatch({ type: GET_ALL_GRAPH_DATA, data: newAllGraphData })
  }
}

export function SetDeleteNodeBeforeMessage(node) {
  return async (dispatch) => {
    dispatch({ type: "SET_DELETE_NODE_BEFORE_MESSAGE", data: node })
  }
}

export function UpdateNodeMessage(node) {
  return async (dispatch) => {
    try {
      const res = await axios_instance.post("/recreateNodeNoRepeat", node)
      if (res.data.code === 200) {
        dispatch({ type: "UPDATE_NODE", data: res.message })
      } else {
        dispatch({
          type: "UPDATE_NODE",
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: "UPDATE_NODE",
        data: [],
      })
    }
  }
}

export function ExportAllDataJsonFile(filename = "neo4j_data.json") {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get("/exportAllDataToJson", {
        responseType: "blob",
      })
      downloadFile(res.data, filename)
      dispatch({
        type: GET_ALL_DATA_JSON_FILE,
        data: true,
      })
    } catch (err) {
      dispatch({
        type: GET_ALL_DATA_JSON_FILE,
        data: false,
      })
    }
  }
}

export function ExportNodesbyLabelsAndProperties(
  filename = "neo4j_data.json",
  condition
) {
  return async (dispatch) => {
    try {
      console.log("condition", condition)
      const res = await axios_instance.post(
        "/exportNodesAndRelationToJson",
        condition,
        {
          responseType: "blob",
        }
      )
      downloadFile(res.data, filename)
      dispatch({
        type: GET_DATA_BY_CONDITION_JSON_FILE,
        data: true,
      })
    } catch (err) {
      dispatch({
        type: GET_DATA_BY_CONDITION_JSON_FILE,
        data: false,
      })
    }
  }
}

export function ImportDataFromJsonFile(fileData, setFileList, setFileStatus) {
  return async (dispatch) => {
    try {
      const res = await axios_instance.post("/importDataFromJson", fileData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res.data.code === 200) {
        setFileList([])
        setFileStatus("200")
        dispatch({ type: "IMPORT_DATA_FROM_JSON_FILE", data: res.code })
      } else {
        setFileStatus("500")
        dispatch({
          type: "IMPORT_DATA_FROM_JSON_FILE",
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: "IMPORT_DATA_FROM_JSON_FILE",
        data: [],
      })
    }
  }
}

export function SubmitUserMessage(uri, userMessage) {
  return async (dispatch) => {
    try {
      const res = await axios_instance.post("/neo4j-config", userMessage, {
        params: {
          uri: uri,
        },
      })
      if (res.data.code === 200) {
        dispatch({ type: "SUBMIT_USER_MESSAGE", data: res.message })
      } else {
        dispatch({
          type: "SUBMIT_USER_MESSAGE",
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: "SUBMIT_USER_MESSAGE",
        data: [],
      })
    }
  }
}

export function RefreshDatabase() {
  return async (dispatch) => {
    try {
      const res = await axios_instance.post("/actuator/refresh")
      if (res.data.code === 200) {
        dispatch({ type: "REFRESH_DATABASE", data: res.code })
      } else {
        dispatch({
          type: "REFRESH_DATABASE",
          data: [],
        })
      }
    } catch (err) {
      dispatch({
        type: "REFRESH_DATABASE",
        data: [],
      })
    }
  }
}
