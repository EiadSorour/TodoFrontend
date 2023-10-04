import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Todos from "./pages/Todos.jsx";

const SERVER_API = "https://todobackend-fer1.onrender.com";
const REACT_PORT = "https://todofrontend-zxd2.onrender.com";

function App(){
    return (
        <div className="main">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home REACT_PORT={REACT_PORT}/>} />
                    <Route path="/home" element={<Home REACT_PORT={REACT_PORT}/>} />
                    <Route path="/login" element={<Login SERVER_API={SERVER_API}/>} />
                    <Route path="/register" element={<Register SERVER_API={SERVER_API} REACT_PORT={REACT_PORT}/>} />
                    <Route path="/todos" element={<Todos SERVER_API={SERVER_API}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;