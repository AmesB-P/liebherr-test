import type {NextAuthOptions} from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
import Credentials from "next-auth/providers/credentials";
import {getUser} from "@/server_actions/login";

// const clientId= process.env.NEXT_PUBLIC_GITHUB_ID as string
// const clientSecret= process.env.NEXT_PUBLIC_GITHUB_SECRET as string

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientSecret : process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
            clientId : process.env.NEXT_PUBLIC_GITHUB_ID as string
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username :",
                    type: "text",
                    placeholder: "Username"
                },
                password : {
                    label :"Password",
                    type : "password",
                    placeholder : "Password"
                }
            },
            async authorize(credentials){
                const {data} = await getUser()
                console.log("data getUser" ,data)
                const user = data.find((where :any) => credentials?.username === where.username && credentials?.password === where.password )
                if(user){
                    return user
                }else {
                    return null
                }
            }
        })
    ]
}