import { Button, Flex, Spacer, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

import Fatos from "./Fatos";
import FatoAleatorio from "./FatoAleatorio";
const Home: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<string | null>(null);

    return (
        <Flex
            direction="column"
            align="center"
            justify="top"
            height="100vh"
            mt="30px"
            bgImage="url('https://img.freepik.com/free-vector/hand-drawn-international-cat-day-background-with-cats_23-2149454620.jpg')"
            bgSize="cover"
        >
            <Flex
                direction="row"
                justify="center"
            >
                <Button onClick={() => setActiveComponent("fatos")} m="2"  bg={activeComponent === "fatos" ? "gray.300" : "blue.400"}>
                    Fato
                </Button>
                <Button onClick={() => setActiveComponent("fato_aleatorio")} m="2" bg={activeComponent === "fato_aleatorio" ? "gray.300" : "blue.400"}>
                    Lista de Fatos
                </Button>
            </Flex>
            <hr/>
            {activeComponent === "fatos" && <Fatos />}
            {activeComponent === "fato_aleatorio" && <FatoAleatorio />}
        </Flex>
    );
}

export default Home;