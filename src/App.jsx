import "./App.css";
import ContextProvider from "./hooks/app/context";
import Router from "./router";

function App() {
	return (
		// <ImagePreloader>
		<ContextProvider>
			<Router />
			{/* <Versioner /> */}
		</ContextProvider>
		// </ImagePreloader>
	);
}

export default App;
