import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import tema from "./temas/tema";
import Home from "./pages/Home";
import Fatos from "./pages/Fatos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FatoAleatorio from "./pages/FatoAleatorio";

const MainApp: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fatos" element={<Fatos />} />
                <Route path="/fato_aleatorio" element={<FatoAleatorio />} />
            </Routes>
        </Router>
    );
}

function App() {
    return (
        <ChakraProvider theme={tema}>
            <MainApp/>
        </ChakraProvider>
    );
}

export default App;
