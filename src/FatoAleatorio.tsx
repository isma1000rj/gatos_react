import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Box, Text, CloseButton, Flex, useToast, VStack, useMediaQuery, FormLabel } from "@chakra-ui/react";
import axios from "axios";

const FatoAleatorio: React.FC = () => {
    const toast = useToast();
    const [fatos, setFatos] = useState<string[]>([]);
    const [maxLength, setMaxLength] = useState<number | string>("");
    const [currentPage, setCurrentPage] = useState<string | null>("https://catfact.ninja/facts");

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const observador = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isLoading && currentPage) {
                setIsLoading(true);
                fetchFact();
            }
        });

        if (loadMoreRef.current) {
            observador.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observador.unobserve(loadMoreRef.current);
            }
        };
    }, [loadMoreRef, maxLength, isLoading, currentPage]);

    const checkScrollEnd = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        ) return;
        fetchFact();
    };


    useEffect(() => {
        window.addEventListener('scroll', checkScrollEnd);
        return () => window.removeEventListener('scroll', checkScrollEnd);
    }, []);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!maxLength) {
            alert("Por favor, preencha o campo Max Length.");
            return;
        }
        fetchFact();
    };
    const fetchFact = async () => {
        if (!currentPage) return;
        setIsLoading(true);
        try {
            const response = await axios.get("https://catfact.ninja/facts", {
                params: {
                    max_length: maxLength,
                },
            });
            setFatos(prevFatos => [...prevFatos, ...response.data.data.map((fact: any) => fact.fact)]);
            setCurrentPage(response.data.next_page_url);
        } catch (error) {
            console.error("Ocorreu um erro para recuperar os dados:", error);
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
                    <FormLabel htmlFor="maxLength">Gerar lista sobre gatos</FormLabel>
                    <Input
                        type="number"
                        placeholder="Quantidade de Letras"
                        value={maxLength}
                        onChange={(e) => setMaxLength(e.target.value)}
                        width="50%"
                        required
                    />
                    <Button type="submit" mt={2}>
                        Buscar Fato
                    </Button>

                </VStack>
            </form>

            <Box w={eMobile ? "690px" : "100%"} p={!eMobile ? "150px" : "0"} mx="auto">
                {fatos.map((fatos, index) => (
                    <Flex
                        key={index}
                        ref={index === fatos.length - 1 ? loadMoreRef : null}
                        align="center"
                        mt="4"
                        direction="row"
                        boxShadow={eMobile ? undefined : "sm"}
                        p={eMobile ? undefined : "6"}
                        rounded={eMobile ? undefined : "md"}
                        backgroundColor={eMobile ? undefined : "gray.100"}
                        w={eMobile ? undefined : "100%"}
                    >
                        <Text flex="2" color="black" whiteSpace="pre-wrap" overflowWrap="break-word">
                            <strong>Fato Nº {index + 1}:</strong> {fatos}
                        </Text>
                        <CloseButton onClick={() => removeFact(index)} />
                    </Flex>
                ))}
            </Box>


        </Box>
    );
};

export default FatoAleatorio;