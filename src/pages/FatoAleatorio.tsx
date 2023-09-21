import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    Button,
    Input,
    Box,
    Text,
    Flex,
    VStack,
    useMediaQuery,
    FormLabel,
    CloseButton,
    useToast
} from "@chakra-ui/react";
import axios from "axios";

const FatoAleatorio: React.FC = () => {
    const [fatos, setFatos] = useState<string[]>([]);
    const [maxLength, setMaxLength] = useState<number | string>("");
    const [nextPageUrl, setNextPageUrl] = useState<string | null>("https://catfact.ninja/facts");
    const toast = useToast();

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const CustomToast: React.FC<{ title: string, description: string }> = ({ title, description }) => {
        return (
            <Box bg="#ed8936" color="#FFF" p={3} borderRadius="md">
                <Text fontWeight="bold">{title}</Text>
                <Text>{description}</Text>
            </Box>
        )
    }
    const fetchFatos = useCallback(async (url: string) => {
        try {
            const response = await axios.get(url, {
                params: {
                    max_length: maxLength,
                },
            });
            setFatos(prevFatos => [...prevFatos, ...response.data.data.map((fact: any) => fact.fact)]);
            setNextPageUrl(response.data.next_page_url);

            if (response.data.current_page === response.data.last_page) {
                toast({
                    title: "Última Página",
                    description: `Esta é a última página com fatos felinos de até ${maxLength} caracteres.`,
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                });
            }


        } catch (error) {
            console.error("Erro ao buscar os fatos:", error);
        }
    }, [maxLength, toast]);

    useEffect(() => {
        const currentRef = loadMoreRef.current;
        const observador = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && nextPageUrl) {
                fetchFatos(nextPageUrl);
            }
        });

        if (loadMoreRef.current) {
            observador.observe(loadMoreRef.current);
        }

        return () => {
            if (currentRef) {
                observador.unobserve(currentRef);
            }
        };
    }, [nextPageUrl,fetchFatos]);
    const removeFact = (index: number) => {
        setFatos(prevFatos => prevFatos.filter((_, i) => i !== index));
        toast({
            render: () => <CustomToast title="Card removido" description="O card foi apagado com sucesso." />,
            status: "success",
            duration: 1000,
            isClosable: true
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchFatos(nextPageUrl!);
    };

    const [eMobile] = useMediaQuery("(min-width: 768px)");

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <VStack width="690px" spacing={4}>
                    <FormLabel htmlFor="maxLength">Gerar lista sobre fatos felinos</FormLabel>
                    <Input
                        type="number"
                        placeholder="Quantidade de Letras"
                        value={maxLength}
                        onChange={(e) => setMaxLength(e.target.value)}
                        width="50%"
                        required
                    />
                    <Button type="submit" mt={2} bg={"orange.400"}>
                        Buscar Fato
                    </Button>

                </VStack>
            </form>

            <Box w={eMobile ? "690px" : "100%"} p={!eMobile ? "150px" : "0"} mx="auto">
                {fatos.map((fato, index) => (
                    <Flex
                        key={index}
                        ref={index === fatos.length - 1 ? loadMoreRef : null}
                        boxShadow={eMobile ? undefined : "sm"}
                        p={eMobile ? undefined : "6"}
                        rounded={eMobile ? undefined : "md"}
                        mt="4"
                        direction="row"
                        align="center"
                        backgroundColor={eMobile ? undefined : "gray.100"}
                        w={eMobile ? undefined : "100%"}
                    >
                        <Text flex="2" color="black" whiteSpace="pre-wrap" overflowWrap="break-word">
                            <strong>Fato Nº {index + 1}:</strong> {fato}
                        </Text>
                        <CloseButton onClick={() => removeFact(index)} />
                    </Flex>
                ))}
            </Box>
        </Box>
    );
};


export default FatoAleatorio;
