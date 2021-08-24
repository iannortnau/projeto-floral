import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from "axios";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credenciais',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: { label: "Nome", type: "text", placeholder: "Ex:Julio" },
                password: {  label: "Senha", type: "Senha", placeholder: "**********" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                if (!credentials.email || !credentials.password) {
                    return null;
                }
                const user = await axios.get(process.env.NEXT_PUBLIC_API_URL+"user/"+credentials.email);

                if (user.data != '') {
                    if(user.data.senha === credentials.password){
                        return user;
                    }else{
                        return null;
                    }
                } else {
                    // If you return null or false then the credentials will be rejected
                    return null;
                    // You can also Reject this callback with an Error or with a URL:
                    // throw new Error('error message') // Redirect to error page
                    // throw '/path/to/redirect'        // Redirect to a URL
                }
            }
        })
    ],
})