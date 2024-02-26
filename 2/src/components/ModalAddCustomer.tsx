"use client"

import {FC, useCallback, useEffect, useState , MouseEventHandler} from "react";


type propsPageTypes ={
    handleSubmitCustomer : Function,
    handleCancel : Function,
    modalController : any,
    customerData? : any | null,
    modeController : any,
    customerDataArr : any[]
}
const ModalAddCustomer : FC<propsPageTypes> = ({handleSubmitCustomer ,modalController , customerData ,handleCancel , modeController , customerDataArr}) => {

    const {showModal , setShowModal} = modalController
    const {mode , setMode} = modeController


    useEffect(()=>{
        let isMounted = true

        if (mode === "edit" && isMounted){
            setCustomerName(customerData.customerName)
        }

        return ()=>{
            isMounted = false
        }

    },[mode])

    const [customerName, setCustomerName] = useState('');

    const submitForm =async (event: any)=>{
        console.log("mode" , mode)
        try {
            event.preventDefault();
            // Create an object with the form data
            const formData = {
                id : mode === "edit" ? customerData.id : customerDataArr.length,
                customerName
            }

            const method = mode === "add" ? "POST" : "PUT"

            await handleSubmitCustomer(formData , method)
            setCustomerName(()=>"")
            handleCancel()
        }catch (e) {
            handleCancel()
        }
    }


    const onOpenModal = useCallback((mode : string)=>{
        setMode("add")
        setCustomerName("")
        setShowModal(true)
    },[setShowModal, setMode])


    return (
        <>
            <button className={`bg-amber-200 rounded-2xl w-1/3 h-full`} onClick={()=>onOpenModal("add")} >
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
                                        Create Customer
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={()=>handleCancel()}
                                    >
                    <span
                        className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form className="w-full max-w-lg" name="create-customer-form" action="" method="post">
                                        <div className="flex flex-wrap -mx-3 mb-6 ">
                                            <div className="flex flex-wrap -mx-3 mb-6 w-full">
                                                <div className="w-full px-3">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="grid-customer-name">
                                                        Customer name
                                                    </label>
                                                    <input
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="grid-customer-name" type="text"
                                                        placeholder="" onChange={(e)=> setCustomerName(e.target.value)} value={customerName}/>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={()=>handleCancel()}
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

export default ModalAddCustomer

