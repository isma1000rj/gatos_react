import { Button, Flex, Spacer, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

import Fatos from "./Fatos";  // Importe seus componentes aqui
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
        >
            <Flex
                direction="row"
                justify="center"
            >
                <Button onClick={() => setActiveComponent("fatos")} m="2">
                    Fato
                </Button>
                <Button onClick={() => setActiveComponent("fato_aleatorio")} m="2">
                    Lista de Fatos
                </Button>
            </Flex>

            {/* Renderize o componente baseado no activeComponent */}
            {activeComponent === "fatos" && <Fatos />}
            {activeComponent === "fato_aleatorio" && <FatoAleatorio />}
        </Flex>
    );
}

export default Home;