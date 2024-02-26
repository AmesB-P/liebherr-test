"use server"
import axios from "axios";

export const fetchDataOrders = async () =>{
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/orders`)
        if(!data) return []

        return data.map((e : any) => {
            delete e.id
            return {
                ...e
            }
        })
    }catch (e) {
        return []
    }
}