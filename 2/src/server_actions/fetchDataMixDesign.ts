"use server"
import axios from "axios";

export const fetchDataMixDesign = async () =>{
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/mixDesigns`)
        if(!data) return []

        return data
    }catch (e) {
        return []
    }
}