import { axios_instance } from "../utils/axios_instance"
export const SELECT_DATE = "SELECT_DATE"
export const GET_ALL_LABEL = "GET_ALL_LABEL"
export const GET_ALL_GRAPH_DATA = "GET_ALL_GRAPH_DATA"

export function selectDate(newDate) {
	return async (dispatch) => {
		dispatch({ type: SELECT_DATE, data: newDate })
	}
}

export function GetAllLabelData() {
	return async (dispatch) => {
		try {
			const res = await axios_instance.get(`/getAllLabel`)
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
