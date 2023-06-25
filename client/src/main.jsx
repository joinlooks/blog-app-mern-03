import React from "react";
import ReactDOM from "react-dom/client";
import App from "./js/App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./js/contexts/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserContextProvider>
	</React.StrictMode>
);
