"use client"
import {TableComponent} from "@/components/Table";
import React, {FC , useEffect, useState} from "react";
import {tableHead} from "@/types/tableTypes";
import {fetchDataSites} from "@/server_actions/fetchDataSites";
import Header from "@/components/MainContentsLayout/Header";

const Sites :FC =  () :JSX.Element => {
    const [sitesData , setSitesData] = useState([])
    const thead : tableHead[] = [
        {
            key : "no",
            name : "No."
        },
        {
            key : "SiteId",
            name : "Site id"
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
            <Header leftSide={"Sites"} rightSide={null}
            />
            <div className={"h-full w-full p-10"}>
                <TableComponent theadData={thead} tbodyData={sitesData}/>
            </div>
        </>
    )
}

export default Sites