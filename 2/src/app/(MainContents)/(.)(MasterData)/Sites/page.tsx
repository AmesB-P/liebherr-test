"use client"
import {TableComponent} from "@/components/Table";
import {FC, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {tableHead} from "@/types/tableTypes";
import {fetchDataSites} from "@/server_actions/fetchDataSites";

const Sites :FC =  () :JSX.Element => {
    const [sitesData , setSitesData] = useState([])
    const thead : tableHead[] = [
        {
            key : "id",
            name : "No."
        },
        {
            key : "customerId",
            name : "Customer id"
        },
        {
            key : "siteName",
            name : "Site name"
        },
        {
            key : "location",
            name : "Location"
        },

    ]

    // const fetchData = async () =>{
    //     try {
    //         const {data} = await axios(`${process.env.NEXT_PUBLIC_API}/sites`)
    //
    //         if(!!data){
    //             setSitesData(data)
    //         }
    //     }catch (e) {
    //         // console.log('e' ,e)
    //     }
    // }

    useEffect(()=>{
        let isMounted = true;

        fetchDataSites().then(res => {
            if (isMounted) {
                setSitesData(res);
            }
        });

        return () => {
            isMounted = false;
        };
    },[])


    return(
        <>
            <div className={"h-full w-full p-10"}>
                <TableComponent theadData={thead} tbodyData={sitesData}/>
            </div>
        </>
    )
}

export default Sites