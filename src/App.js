import React from "react"
import store from "./store"
import { Provider } from "react-redux"
import Neo4jMenu from "./components/Neo4jMenu"

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Neo4jMenu />
			</div>
		</Provider>
	)
}

export default App
