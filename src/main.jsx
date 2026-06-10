// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ClerkAppProvider from "./auth/ClerkAppProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ClerkAppProvider>
			<App />
		</ClerkAppProvider>
    </React.StrictMode>
);
