import { combineReducers } from "redux"

import GraphDataReducer from "./index"

const rootReducer = combineReducers({
	Graph: GraphDataReducer,
})

export default rootReducer
