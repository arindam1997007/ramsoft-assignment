import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import "./index.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { BrowserRouter } from "react-router-dom"

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	typography: {
		fontFamily: ["Aleo", "Helvetica Neue", "Arial", "sans-serif"].join(","),
		fontSize: 16,
		h1: {
			fontSize: "2.25rem",
		},
		h2: {
			fontSize: "2rem",
		},
		h3: {
			fontSize: "1.75rem",
		},
		h4: {
			fontSize: "1.5rem",
		},
		h5: {
			fontSize: "1.25rem",
		},
		h6: {
			fontSize: "0.875rem",
		},
	},
})

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
)
