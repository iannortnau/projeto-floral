import Router from 'next/router';
import React from "react";
import {signIn, signOut, useSession} from "next-auth/client";
import logo from '../img/logo.png';
import Image from "next/image";
import {Box, Button, Flex, Link, Text} from "rebass";
import ModalLogin from "./ModalLogin";

export default function Header() {
    const [ session, loading ] = useSession();
    console.log(session);

    return (
        <Flex
            className={"sombra"}
            p={2}
            color={'rgb(69,115,180)'}
            alignItems='center'>
            <Image
                src={logo}
                width={160}
                height={50}
            />
            <Box mx='auto' />
            {session
                ?
                <>
                    <Text
                        fontSize={20}
                        fontWeight='bold'
                        color='primary'
                    >
                        Logado como
                    </Text>
                    <Button
                        onClick={function () {
                            signOut();
                        }}
                        className={"w3-button"}
                        variant='primary'
                        m={2}
                        bg={"rgb(218,69,81)"}
                        fontWeight='bold'
                    >
                        Sair
                    </Button>
                </>
                :
                <>
                    <Text
                        fontSize={20}
                        fontWeight='bold'
                        color='primary'
                    >
                        Você não está logado
                    </Text>
                    <Button
                        className={"w3-button"}
                        variant='primary'
                        m={2}
                        bg={"rgb(69,115,180)"}
                        fontWeight='bold'
                    >
                        Entrar
                    </Button>
                </>
            }
            <ModalLogin/>
        </Flex>



    );
}
