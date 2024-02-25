import axios from "axios";

export const fetchDataSites = async () =>{
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/sites`)
        console.log('data' ,data)
        if(!data) return []

        return data
    }catch (e) {
        console.log('e' ,e)
    }
}