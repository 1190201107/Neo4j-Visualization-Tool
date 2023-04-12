import { axios_instance } from "../utils/axios_instance";
export const SELECT_DATE = "SELECT_DATE";
export const GET_ALL_LABEL = "GET_ALL_LABEL";
export const GET_ALL_GRAPH_DATA = "GET_ALL_GRAPH_DATA";
export const GET_ALL_RELATION_NAME = "GET_ALL_RELATION_NAME";
export const GET_ALL_PROPERTIES_NAME = "GET_ALL_PROPERTIES_NAME";

export function selectDate(newDate) {
  return async (dispatch) => {
    dispatch({ type: SELECT_DATE, data: newDate });
  };
}

export function GetAllGraphData() {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get(`/getAllGraph`);
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_GRAPH_DATA, data: res.data.data });
      } else {
        dispatch({
          type: GET_ALL_GRAPH_DATA,
          data: [],
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_GRAPH_DATA,
        data: [],
      });
    }
  };
}

export function GetAllLabelData() {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get(`/getAllLabel`);
      // console.log("res.data.data", res.data.data)
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_LABEL, data: res.data.data });
      } else {
        dispatch({
          type: GET_ALL_LABEL,
          data: [],
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_LABEL,
        data: [],
      });
    }
  };
}

export function GetAllRelationNameData() {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get(`/getAllRelationName`);
      // console.log("res.data.data", res.data.data)
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_RELATION_NAME, data: res.data.data });
      } else {
        dispatch({
          type: GET_ALL_RELATION_NAME,
          data: [],
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_RELATION_NAME,
        data: [],
      });
    }
  };
}

export function GetAllPropertiesNameData() {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get(`/getAllPropertiesName`);
      // console.log("res.data.data ---getAllPropertiesName", res.data.data)
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_PROPERTIES_NAME, data: res.data.data });
      } else {
        dispatch({
          type: GET_ALL_PROPERTIES_NAME,
          data: [],
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_PROPERTIES_NAME,
        data: [],
      });
    }
  };
}

export function GetAllGraphDataByLabel(label) {
  return async (dispatch) => {
    try {
      const res = await axios_instance.get("/searchDataByLabel", {
        params: label,
      });
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_GRAPH_DATA, data: res.data.data });
      } else {
        dispatch({
          type: GET_ALL_GRAPH_DATA,
          data: [],
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_GRAPH_DATA,
        data: [],
      });
    }
  };
}

export function GetAllGraphDataByRelationshipTypes(relationshipType) {
  const data = {
    relationshipTypes: [relationshipType],
  };
  return async (dispatch) => {
    try {
      const res = await axios_instance.post("/searchRelationships", data);
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_GRAPH_DATA, data: res.data.data });
      } else {
        dispatch({
          type: GET_ALL_GRAPH_DATA,
          data: [],
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_GRAPH_DATA,
        data: [],
      });
    }
  };
}

export function GetAllGraphDataByPropertyKeys(property) {
  const data = {
    properties: { property },
  };
  return async (dispatch) => {
    try {
      const res = await axios_instance.post("/searchNodes", data);
      if (res.data.code === 200) {
        dispatch({ type: GET_ALL_GRAPH_DATA, data: res.data.data });
      } else {
        dispatch({
          type: GET_ALL_GRAPH_DATA,
          data: [],
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_GRAPH_DATA,
        data: [],
      });
    }
  };
}
