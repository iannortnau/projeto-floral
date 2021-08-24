import Router from 'next/router';
import {signIn, signOut, useSession} from "next-auth/client";
import Header from "../../components/Header.js";

export default function Painel() {
    const [ session, loading ] = useSession()

    return (
        <Header/>
    );
}
