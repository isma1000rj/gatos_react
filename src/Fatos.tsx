import React, { useState } from "react";
import { Button, Input, Box, Text, CloseButton, Flex, useToast, VStack, useMediaQuery, FormLabel } from "@chakra-ui/react";
import axios from "axios";

const Fato: React.FC = () => {
    const toast = useToast();
    const [fatos, setFatos] = useState<string[]>([]);
    const [maxLength, setMaxLength] = useState<number | string>("");


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!maxLength) {
            alert("Por favor, preencha o campo Max Length.");
            return;
        }
        fetchFact();
    };
    const fetchFact = async () => {
        try {
            const response = await axios.get("https://catfact.ninja/fact", {
                params: {
                    max_length: maxLength,
                },
            });
            setFatos(prevFatos => [...prevFatos, response.data.fact]);
        } catch (error) {
            console.error("There was an error fetching the cat fact:", error);
        }
    };

    const removeFact = (index: number) => {
        setFatos(prevFatos => prevFatos.filter((_, i) => i !== index));
        toast({
            title: "Card removido",
            description: "O card foi apagado com sucesso.",
            status: "success",
            duration: 1000,
            isClosable: true,
        });
    };

    const [eMobile] = useMediaQuery("(min-width: 768px)");


    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <VStack width="690px" spacing={4}>
                    <FormLabel htmlFor="maxLength">Buscar fatos felinos</FormLabel>
                    <Input
                        type="number"
                        placeholder="Quantidade de Letras"
                        value={maxLength}
                        onChange={(e) => setMaxLength(e.target.value)}
                        width="50%"
                        required
                    />
                    <Button type="submit" mt={2} bg={"blue.400"}>
                        Buscar
                    </Button>

                </VStack>
            </form>

            <Box w={eMobile ? "690px" : "100%"} p={!eMobile ? "150px" : "0"} mx="auto">
            {fatos.map((fato, index) => (
                    eMobile ? (
                        <Flex
                            key={index}
                            align="center"
                            mt="4"
                            direction="row">
                            <Text flex="1" color="black" whiteSpace="pre-wrap" overflowWrap="break-word" overflow="hidden">
                                <strong>Fato Nº {index + 1}:</strong> {fato}
                            </Text>
                            <CloseButton onClick={() => removeFact(index)} />
                        </Flex>
                    ) : (
                        <Flex
                            key={index}
                            boxShadow="sm"
                            p="6"
                            rounded="md"
                            mt="1"
                            direction="row"
                            align="center"
                            backgroundColor="gray.100"
                            w="100%"
                        >
                            <Text
                                flex="2"
                                color="black"
                                whiteSpace="pre-wrap"
                                overflowWrap="break-word"
                            >
                                <strong>Fato Nº {index + 1}:</strong> {fato}
                            </Text>
                            <CloseButton onClick={() => removeFact(index)} />
                        </Flex>
                    )
                ))}
            </Box>


        </Box>
    );
};

export default Fato;