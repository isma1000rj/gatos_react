import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import tema from "./temas/tema";
import Home from "./Home";
import Fatos from "./Fatos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FatoAleatorio from "./FatoAleatorio";

const MainApp: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route index element={<div>Selecione uma lista</div>} />*/}
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
