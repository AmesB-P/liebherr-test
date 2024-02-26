"use client"
import {TableComponent} from "@/components/Table";
import Header from "@/components/MainContentsLayout/Header";
import {useCallback, useEffect, useState} from "react";
import {fetchDataMixDesign} from "@/server_actions/fetchDataMixDesign";
import {tableHead} from "@/types/tableTypes";
import {debounce, isPlainObject} from "lodash";
import axios from "axios";

const MixDesign = () => {
    const [mixDesignData , setMixDesignData] = useState<Array<any>>([])
    const thead : tableHead[] = [
        {
            key : "id",
            name : "ID.",
            align : "center"
        },
        {
            key : "mixDesignCode",
            name : "Mix design code"
        },
        {
            key : "mixDesignDescription:",
            name : "Mix design description"
        },
        {
            key : "strength:",
            name : "strength"
        },
        {
            key : "components",
            name : "components",
            children : [
                {
                    key : "materialId",
                    name : "material id",
                },
                {
                    key : "unit",
                    name : "unit",
                },
                {
                    key : "value",
                    name : "value",
                },
            ]
        },

    ]

    useEffect(()=>{
        let isMounted = true;

        fetchDataMixDesign().then(res => {
            if (isMounted) {
                setMixDesignData(res);
            }
        });

        return () => {
            isMounted = false;
        };
    },[])


    const handleSearch = async (event: any)=>{
        try {
            const value = event.target.value
            const {data} = await axios(`${process.env.NEXT_PUBLIC_API}/mixDesigns/${value}`)

            if(!data) setMixDesignData((prevValue : any) => [...prevValue])

            setMixDesignData(()=>isPlainObject(data) ? [data] : [...data])

        }catch (e) {

        }
    }

    const debounceSearch = debounce(handleSearch , 400)

    return(
        <>
            <Header leftSide={"Mix Design"} rightSide={
                <>
                    <div className={`grid-cols-1 gap-2 flex justify-end items-center`}>
                        <label> Search</label>
                        <input placeholder={"Search by ID"} type={"search"} className={`border-2 rounded w-full h-full`} onChange={debounceSearch}/>
                        <button className={`bg-amber-200 rounded-2xl w-1/3 h-full`}>
                            Add +
                        </button>
                    </div>
                </>
            }
            />
            <div className={"h-full w-full p-10"}>
                <TableComponent theadData={thead} tbodyData={mixDesignData}/>
            </div>

        </>
    )
}

export default MixDesign