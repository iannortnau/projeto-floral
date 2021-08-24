import {signIn, signOut, useSession} from "next-auth/client";
import {useState} from "react";
import {Box, Button, Flex, Text} from "rebass";
import logo from "../img/logo2.png";
import carregandoImg from "../img/carregando.png";
import Image from "next/image";
import {
    Label,
    Input,
    Select,
    Textarea,
    Radio,
    Checkbox,
} from '@rebass/forms'

export default function ModalLogin(){
    const [email,setEmail] = useState();
    const [senha,setSenha] = useState();
    const [ session, loading ] = useSession();
    const [carregando,setCarregando] = useState(false);
    const [ms,setMs] = useState(null);

    async function loga(){
        setMs(null);
        setCarregando(true);
        const resposta =  await signIn('credentials', { redirect: false,email: email, password: senha});

        if(resposta.ok === false){
            setCarregando(false);
            setMs("E-mail ou Senha estão incorretos.");
        }
    }



    if(session){
        return (<></>);
    }else {
        return (
            <div className={"w3-modal"} style={{display:"block"}}>
                <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Box
                        as={"form"}
                        onSubmit={function (e) {
                            e.preventDefault();
                            loga();
                        }}
                        p={3}
                        className={"w3-modal-content w3-animate-zoom"}
                        width={400}
                        height={500}
                        bg={"white"}
                        color={"rgb(29,95,169)"}
                    >
                        <Flex
                            alignItems={"center"}
                            justifyContent={"top"}
                            width={"100%"}
                            height={"100%"}
                            flexDirection={"column"}
                        >
                            <Image src={logo} width={150} height={150}/>

                            <Text className={"tituloLogin"}>Login</Text>

                            <Box width={1} px={2} mt={4}>
                                <Label htmlFor='email' fontWeight={"bold"}>E-mail</Label>
                                <Input
                                    onChange={function (aux) {
                                        setEmail(aux.target.value);
                                    }}
                                    className={"inputLogin"}
                                    id='email'
                                    type={"email"}
                                    name='email'
                                    fontWeight={"bold"}
                                    required={true}
                                />
                            </Box>

                            <Box width={1} px={2} mt={2}>
                                <Label htmlFor='Senha' fontWeight={"bold"}>Senha</Label>
                                <Input
                                    onChange={function (aux) {
                                        setSenha(aux.target.value);
                                    }}
                                    className={"inputLogin"}
                                    type={"password"}
                                    id='senha'
                                    name='senha'
                                    required={true}
                                />
                            </Box>

                            {ms &&
                                <Box
                                    className={"ms"}
                                    p={2} mt={2}
                                    fontWeight={"bold"}
                                    color={"white"}
                                    bg={"rgb(213,33,48)"}
                                >
                                    {ms}
                                </Box>
                            }

                            <Flex
                                mt={4}
                                width={"100%"}
                                justifyContent={"space-around"}
                                flexDirection={"row"}
                            >
                                {carregando
                                    ?
                                        <Button
                                            bg={"rgb(34,92,164)"}
                                            fontWeight={"bold"}
                                            width={100} height={40}
                                        >
                                            <Image
                                                className={"w3-spin"}
                                                src={carregandoImg}
                                                width={25} height={25}
                                            />
                                        </Button>
                                    :
                                        <Button
                                            bg={"rgb(34,92,164)"}
                                            fontWeight={"bold"}
                                            type={"submit"}
                                            width={100} height={40}
                                        >
                                            Entrar
                                        </Button>
                                }
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </div>
        );
    }

}
