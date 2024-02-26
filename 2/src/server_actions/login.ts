"use server"
import axios from "axios";
import {cookies} from "next/headers";

export const getUser = async () =>{
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/users`)

        if(!data) return []

        return data
    }catch (e) {
        return []
    }
}

export const login = async ({username , password} : {username : string , password :string})=>{
    try {
        const userData = await getUser()

        const user = userData.find((where :any) => username === where.username && password === where.password )

        if(user){
            // cookies.set("token", true)
            return user
        }else {
            return null
        }
    }catch (e) {

    }
}