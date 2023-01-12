import React from "react";
import Router from '../router/Router'
import axios from "axios";


axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

export default function App() {
    return (
        <div>
            <Router />
        </div>
    )
}
