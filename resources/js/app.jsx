import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./Pages/App";



ReactDOM.createRoot(document.getElementById("app")).render(
    <HashRouter>
        <App />
    </HashRouter>,
);
