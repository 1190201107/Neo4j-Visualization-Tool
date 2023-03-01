import * as actions from "../Action"

const initState = {
	loading: false,
	error: null,
	graphAllLabel: [],
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
		default:
			return state
	}
}
