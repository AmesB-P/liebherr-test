"use client"
import Header from "@/components/MainContentsLayout/Header";
import ModalAddOrder from "@/components/ModalAddOrder";
import {TableComponent} from "@/components/Table";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {customerTypes, tableHead} from "@/types/tableTypes";
import {fetchCustomersData} from "@/server_actions/fetchCustomersData";
import ModalAddCustomer from "@/components/ModalAddCustomer";

const Customers = () => {
    const [customerData, setCustomerData] = useState<customerTypes[] | []>([])
    const [editCustomerData, setEditCustomerData] = useState({})

    const thead: tableHead[] = [
        {
            key: "no",
            name: "No."
        },{
            key: "customerId",
            name: "customer id"
        },
        {
            key: "customerName",
            name: "customer name"
        },
        {
            key: "actions",
            name: "Actions"
        },

    ]

    useEffect(() => {
        let isMounted = true;

        fetchCustomersData().then(res => {
            if (isMounted) {
                setCustomerData(res);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [])

    const [mode , setMode] = useState("add")

    const handleSubmit = useCallback(async (formCustomerData: any , method: string) => {
        try {
            const {data, status} = await axios({
                method ,
                url: `${process.env.NEXT_PUBLIC_API}/customers`,
                data: [formCustomerData]
            })

            if (status === 201) {
                setCustomerData((prevState) => {
                    return [...prevState, ...data]
                })
                setEditCustomerData("")
            }else{
                alert("Something went wrong!!")
                setEditCustomerData("")
            }
        } catch (e) {
            alert("Something went wrong!!")
            setEditCustomerData("")
            console.log("e" ,e)
        }

    }, [])
    const handleDelete = useCallback(async (formCustomerData: any ) => {
        try {
            const {data, status} = await axios({
                method : "DELETE",
                url: `${process.env.NEXT_PUBLIC_API}/customers`,
                data: [formCustomerData]
            })

            if (status === 201) {
                setCustomerData((prevState) => {
                    return [...prevState, ...data]
                })
                setEditCustomerData("")
            }else{
                alert("Something went wrong!!")
                setEditCustomerData("")
            }
        } catch (e) {
            alert("Something went wrong!!")
            setEditCustomerData("")
            console.log("e" ,e)
        }

    }, [])


    const [showModal, setShowModal] = useState(false);

    const handleEditCustomer =  useCallback((customerData : customerTypes)=>{
        setMode('edit')
        setEditCustomerData(customerData)
        setShowModal(true)
    },[])

    const handleCancel =  useCallback(()=>{
        setMode('add')
        setEditCustomerData({})
        setShowModal(false)
    },[])
  return(
      <>
          <Header leftSide={"Customers"} rightSide={
              <>
                  <div className={`grid-cols-1 gap-2 flex justify-end items-center`}>
                      <ModalAddCustomer handleCancel={handleCancel} handleSubmitCustomer={handleSubmit}  modalController={{showModal , setShowModal}} modeController={{mode,setMode}} customerData={editCustomerData} customerDataArr={customerData}/>
                  </div>
              </>
          }
          />

          <div className={"h-full w-full p-10 overflow-hidden"}>
              <TableComponent handleDelete={handleDelete} theadData={thead} tbodyData={customerData} handleEditCustomer={handleEditCustomer} modeController={{mode,setMode}} isUseActions/>
          </div>

      </>
  )
}

export default Customers