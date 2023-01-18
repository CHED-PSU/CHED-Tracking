import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./Pages/App";
<meta name="csrf-token" content="{{ csrf_token() }}"></meta>
import axios from 'axios';


axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').content;

ReactDOM.createRoot(document.getElementById("app")).render(
    <HashRouter>
        <App />
    </HashRouter>,
);
