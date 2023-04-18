import * as actions from "../Action"

const initState = {
  loading: false,
  error: null,
  graphAllData: {
    graph: {
      nodes: [],
      relationships: [],
    },
    countMessage: {
      labelsCount: [],
      typesCount: [],
    },
  },
  hoverState: false,
  deleteNodeBeforeMessage: {
    labels: [],
    properties: {},
  },
}

/**
 * 接收两个参数
 * 第一个是 state
 * 第二个是 action
 */
export default function Reducer(state = initState, action) {
  const { type, data } = action
  switch (type) {
    case actions.GET_ALL_LABEL: {
      return {
        ...state,
        graphAllLabel: data,
      }
    }
    case actions.GET_ALL_GRAPH_DATA: {
      return {
        ...state,
        graphAllData: data,
      }
    }
    case actions.GET_ALL_RELATION_NAME: {
      return {
        ...state,
        graphAllRelationName: data,
      }
    }
    case actions.GET_ALL_PROPERTIES_NAME: {
      return {
        ...state,
        graphAllPropertiesName: data,
      }
    }
    case actions.GET_ALL_PROPERTIES_VALUE: {
      return {
        ...state,
        graphAllPropertiesValue: data,
      }
    }
    case actions.SET_HOVER_NODE: {
      return {
        ...state,
        hoverNode: data,
      }
    }
    case actions.SET_HOVER_STATE: {
      return {
        ...state,
        hoverState: data,
      }
    }
    case actions.ADD_NODE: {
      return {
        ...state,
        addNode: data,
      }
    }
    case actions.DELETE_NODE: {
      return {
        ...state,
        deleteNode: data,
      }
    }
    case actions.SET_DELETE_NODE_BEFORE_MESSAGE: {
      return {
        ...state,
        deleteNodeBeforeMessage: data,
      }
    }
    case actions.UPDATE_NODE: {
      return {
        ...state,
        updateNode: data,
      }
    }
    default:
      return state
  }
}
