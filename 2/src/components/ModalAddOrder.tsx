"use client"

import {FC, useEffect, useState} from "react";
import {customerTypes, mixDesignsTypes, sitesTypes} from "@/types/tableTypes";
import {fetchDataSites} from "@/server_actions/fetchDataSites";
import {fetchDataMixDesign} from "@/server_actions/fetchDataMixDesign";
import {fetchCustomersData} from "@/server_actions/fetchCustomersData";

const ModalAddOrder : FC<{handleSubmitOrder : Function}> = ({handleSubmitOrder}) => {
    const [showModal, setShowModal] = useState(false);

    const [customersData, setCustomersData] = useState<customerTypes[]|[]>([]);
    const [mixDesignData, setMixDesignData] = useState<mixDesignsTypes[]|[]>([]);
    const [dataSites, setDataSites] = useState<sitesTypes[] | []>([]);

    const fetchAllData =()=>{
        try {
            fetchDataMixDesign().then(res => {
                setMixDesignData(res)
            });
            fetchDataSites().then(res => {
                setDataSites(res)
            });
            fetchCustomersData().then(res => {
                setCustomersData(res)
            });

        }catch (e) {

        }
    }


    useEffect(()=>{
        let isMounted = true

        if (isMounted) {
            fetchAllData()
        }

        return ()=>{
            isMounted = false
        }

    },[])

    const [customerId, setCustomerId] = useState('');
    const [sitesId, setSitesId] = useState('');
    const [mixDesignId, setMixDesignId] = useState('');
    const [qty, setQty] = useState('');
    const [remark, setRemark] = useState('');

    const submitForm =async (event: any)=>{
        try {
            event.preventDefault();
            // Create an object with the form data
            const formData = {
                customerId,
                sitesId,
                mixDesignId,
                qty,
                remark,
                orderDate : new Date(),
                status : "Available"
            }

            await handleSubmitOrder(formData)
            handleCancel()
        }catch (e) {
            handleCancel()
        }
    }

    const handleCancel =()=>{
        try {
            setCustomerId("")
            setSitesId("")
            setMixDesignId("")
            setQty("")
            setRemark("")
            setShowModal(false)
        }catch (e) {

        }
    }

    return (
        <>
            <button className={`bg-amber-200 rounded-2xl w-1/3 h-full`} onClick={()=> setShowModal(true)} >
                Add +
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Create Order
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                    <span
                        className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form className="w-full max-w-lg" name="create-oder-form" action="" method="post">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-first-name">
                                                    Customer id
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="customerId"
                                                        name={"customerId"}
                                                        onChange={(e) => setCustomerId(e.target.value)}
                                                        value={customerId}
                                                    >
                                                        <option value="">Select a customer</option>
                                                        {
                                                            customersData.map((customersDataArr , index ) => (
                                                                <option key={index} value={customersDataArr.id}>
                                                                    {customersDataArr.customerName}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                    <div
                                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4"
                                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path
                                                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2 px-3">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-last-name">
                                                    Data sites
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="sitesId"
                                                        name={"sitesId"}
                                                        onChange={(e) => setSitesId(e.target.value)}
                                                        value={sitesId}
                                                    >
                                                        <option value="">Select a site</option>
                                                        {
                                                            dataSites.map((dataSitesArr , index ) => (
                                                                <option key={index} value={dataSitesArr.id}>
                                                                    {dataSitesArr.siteName}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                    <div
                                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4"
                                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path
                                                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2 px-3 pt-2">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-last-name">
                                                    Mex design code
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="mixDesignId"
                                                        name={"mixDesignId"}
                                                        onChange={(e) => setMixDesignId(e.target.value)}
                                                        value={mixDesignId}
                                                    >
                                                        <option value="">Select a mix design</option>
                                                        {
                                                            mixDesignData.map((mixDesignDataArr , index ) => (
                                                                <option key={index} value={mixDesignDataArr.id}>
                                                                    {mixDesignDataArr.mixDesignCode}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                    <div
                                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4"
                                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path
                                                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2 px-3 pt-2">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-last-name">
                                                    QTY
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="QTY" name={'qty'} type="text" placeholder="" onChange={(e) => setQty(e.target.value)} value={qty}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-remark">
                                                    Reamrk
                                                </label>
                                                <textarea
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-remark" name={"remark"} placeholder="" onChange={(e) => setRemark(e.target.value)} value={remark}>

                                                </textarea>
                                                    {/*<p className="text-gray-600 text-xs italic">Make it as long and as*/}
                                                    {/*    crazy as you'd like</p>*/}

                                            </div>
                                        </div>
                                        {/*<div className="flex flex-wrap -mx-3 mb-2">*/}
                                        {/*    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">*/}
                                        {/*        <label*/}
                                        {/*            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"*/}
                                        {/*            htmlFor="grid-city">*/}
                                        {/*            City*/}
                                        {/*        </label>*/}
                                        {/*        <input*/}
                                        {/*            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"*/}
                                        {/*            id="grid-city" type="text" placeholder="Albuquerque"/>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">*/}
                                        {/*        <label*/}
                                        {/*            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"*/}
                                        {/*            htmlFor="grid-state">*/}
                                        {/*            State*/}
                                        {/*        </label>*/}
                                        {/*        <div className="relative">*/}
                                        {/*            <select*/}
                                        {/*                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"*/}
                                        {/*                id="grid-state">*/}
                                        {/*                <option>New Mexico</option>*/}
                                        {/*                <option>Missouri</option>*/}
                                        {/*                <option>Texas</option>*/}
                                        {/*            </select>*/}
                                        {/*            <div*/}
                                        {/*                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">*/}
                                        {/*                <svg className="fill-current h-4 w-4"*/}
                                        {/*                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">*/}
                                        {/*                    <path*/}
                                        {/*                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>*/}
                                        {/*                </svg>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">*/}
                                        {/*        <label*/}
                                        {/*            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"*/}
                                        {/*            htmlFor="grid-zip">*/}
                                        {/*            Zip*/}
                                        {/*        </label>*/}
                                        {/*        <input*/}
                                        {/*            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"*/}
                                        {/*            id="grid-zip" type="text" placeholder="90210"/>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </form>
                                </div>
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCancel}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        name={"submit-form"}
                                        onClick={submitForm}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default ModalAddOrder

