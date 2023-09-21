import { Button, Flex, Box, Text } from "@chakra-ui/react";
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
        >
            <Flex
                direction="row"
                justify="center"
                position="fixed"
                top="0"
                left="0"
                right="0"
                bg="white"
                zIndex="1"
                p={2}
            >
                <Button onClick={() => setActiveComponent(null)} m="2" bg={activeComponent === null ? "gray.300" : "orange.400"}>
                    Início
                </Button>
                <Button onClick={() => setActiveComponent("fatos")} m="2"  bg={activeComponent === "fatos" ? "gray.300" : "orange.400"}>
                    Fato
                </Button>
                <Button onClick={() => setActiveComponent("fato_aleatorio")} m="2" bg={activeComponent === "fato_aleatorio" ? "gray.300" : "orange.400"}>
                    Lista de Fatos
                </Button>
            </Flex>
            <hr/>
            <Box mt="60px">
                {activeComponent === null && (
                    <Text textAlign="center" mt={5}>
                        Nesse sistema você pode buscar fatos sobre gatos. Busque um fato por vez no primeiro botão ou veja uma lista no segundo botão.
                    </Text>
                )}
                <hr/>
                {activeComponent === "fatos" && <Fatos />}
                {activeComponent === "fato_aleatorio" && <FatoAleatorio />}
            </Box>
        </Flex>
    );
}

export default Home;