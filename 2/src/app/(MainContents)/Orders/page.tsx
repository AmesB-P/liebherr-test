"use client"
import Header from "@/components/MainContentsLayout/Header";
import {useCallback, useEffect, useState} from "react";
import {TableComponent} from "@/components/Table";
import ModalAddOrder from "@/components/ModalAddOrder";
import {tableHead} from "@/types/tableTypes";
import {fetchDataOrders} from "@/server_actions/fetchOrders";
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid'
import axios from "axios";

const Orders = () => {
    type orderDataTypes = {
        customerId: string
        id?: number
        mixDesignId: string
        qty: string
        remark: string
        sitesId: string
    }
    const [ordersData, setOrdersData] = useState<any[] | []>([])

    const thead: tableHead[] = [
        {
            key: "id",
            name: "No."
        },
        {
            key: "customerId",
            name: "Customer id"
        },
        {
            key: "sitesId",
            name: "Site id"
        },
        {
            key: "mixdesignId",
            name: "Mixdesign id"
        },
        {
            key: "orderqty",
            name: "Order qty"
        },
        {
            key: "remark",
            name: "Remark"
        },
        {
            key: "orderDate",
            name: "Order date"
        },
        {
            key: "status",
            name: "Status"
        },

    ]

    useEffect(() => {
        let isMounted = true;

        fetchDataOrders().then(res => {
            if (isMounted) {
                setOrdersData(res);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [])

    const handleSubmitOrder = useCallback(async (formOrderData: any) => {
        try {
            const {data, status} = await axios({
                method: 'post',
                url: `${process.env.NEXT_PUBLIC_API}/orders`,
                data: formOrderData
            })

            if (status === 201) {
                delete data.id

                setOrdersData((prevState) => {
                    return [...prevState, data]
                })
            }else{
                alert("Something went wrong!!")
            }
        } catch (e) {
            alert("Something went wrong!!")
        }

    }, [])


    return (
        <>
            <Header leftSide={"Orders"} rightSide={
                <>
                    <div className={`grid-cols-1 gap-2 flex justify-end items-center`}>
                        <ModalAddOrder handleSubmitOrder={handleSubmitOrder}/>
                    </div>
                </>
            }
            />

            <div className={"h-full w-full p-10 overflow-hidden"}>
                <TableComponent theadData={thead} tbodyData={ordersData}/>
            </div>

        </>
    )
}

export default Orders