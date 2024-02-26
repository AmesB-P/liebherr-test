"use server"
import axios from "axios";

export const fetchCustomersData = async () =>{
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/customers`)

        if(!data) return []

        return data
    }catch (e) {
        return []
    }
}