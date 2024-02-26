"use client"
import React, {FC, useCallback, useEffect, useState} from 'react';
import {tableComponentTypes} from "@/types/tableTypes";
import {isArray} from "lodash";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";


const TableComponent :FC<tableComponentTypes> = ({isUseNo = true,theadData, tbodyData ,isUseActions = false , handleEditCustomer}): JSX.Element => {

    const [currentPage, setCurrentPage] = useState(1)
    const [TBodyData, setTBodyData] = useState<tableComponentTypes["tbodyData"] | []>([])

    const pageSize = 10;
    const totalPages = Math.ceil(tbodyData.length / pageSize);

    const paginate = (arr: any[], currentPage: number, pageSize: number) => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return arr.slice(startIndex, endIndex);
    }

    useEffect(() => {
        const newBodyData = paginate(tbodyData, currentPage, pageSize)
        setTBodyData(newBodyData)

        return () => {
            setTBodyData(newBodyData)
        }
    }, [tbodyData, currentPage])




    const pageNumbersToShow = 5; // Number of page numbers to display

    // Calculate the range of page numbers to display
    let startPage = Math.max(1, currentPage - Math.floor(pageNumbersToShow / 2));
    let endPage = Math.min(totalPages, startPage + pageNumbersToShow - 1);

    // Adjust startPage and endPage if needed to ensure we display pageNumbersToShow pages
    if (endPage - startPage + 1 < pageNumbersToShow) {
        startPage = Math.max(1, endPage - pageNumbersToShow + 1);
    }

    // Generate an array of page numbers to display
    const pageNumbers = Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);


    const handleChangePage = useCallback((pageNum: number) => {
        setCurrentPage(pageNum)
    }, [])


    return (
        <div className="overflow-auto">
            <table className="table-auto overflow-auto w-full h-full border-separate border border-gray-200">
                <thead>
                <tr className="bg-gray-100">
                    {
                        theadData.map((item, index) => (
                            <th key={index} scope={"col"} colSpan={item?.children ? theadData.length : 1}
                                className={`px-4 py-2 text-${item.align}`}>
                                {item.name}
                            </th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>

                {
                    TBodyData ? (
                        TBodyData.map((items, index) => {
                                // @ts-ignore
                            return (
                                    <tr key={`${index}-${items.id}`}>
                                        {isUseNo ? <td key={index}>{index + 1}</td> : null}
                                        {
                                            Object.keys(items).map((key: string, _idx: number) =>
                                                isArray((items as any)[key]) ? (
                                                    <td key={`components-${index}-${_idx}`}>
                                                        {
                                                            (items as any)[key].map((child: any) => (
                                                                    <div className={"flex w-full justify-between"}
                                                                         key={`child-${child.id}`}>
                                                                        material id : {child.materialId} , unit
                                                                        : {child.unit} , value : {child.value}
                                                                    </div>
                                                                )
                                                            )
                                                        }
                                                    </td>
                                                ) : (
                                                        <td key={`${index}-${key}`} className="border px-4 py-2">
                                                            {(items as any)?.[key] ?? "-"}
                                                        </td>
                                                )
                                            )
                                        }
                                        {
                                            isUseActions ? (
                                                <td key={`actions- ${index}`} className="border px-4 py-2">
                                                    <div className={"grid sm:grid-cols-2 grid-cols-1 justify-center text-center gap-2"}>
                                                        <button onClick={()=>handleEditCustomer(items)} className={"bg-yellow-400 text-white rounded-lg"}>
                                                            edit
                                                        </button>
                                                        <button className={"bg-red-700 text-white rounded-lg"}>
                                                            delete
                                                        </button>
                                                    </div>
                                                </td>
                                            ) : null
                                        }

                                    </tr>
                                )
                            }
                        )
                    ) : (
                        <tr>
                            <td>Loading</td>
                        </tr>
                    )

                }
                </tbody>
            </table>

            {/*<Pagetination currentPage={currentPage} totalPages={totalPages}/>*/}

            <div className="flex items-center justify-end border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a
                        // href="#"
                        onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                    </a>
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(pageNumber => (
                        <a
                            key={pageNumber}
                            // href="#"
                            onClick={() => handleChangePage(pageNumber)}
                            className={`relative inline-flex items-center ${
                                currentPage === pageNumber
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                            {pageNumber}
                        </a>
                    ))}
                    <a
                        // href="#"
                        onClick={() => handleChangePage(Math.min(totalPages, currentPage + 1))}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                    </a>
                </nav>
            </div>
        </div>
    );
};

export {
    TableComponent
}

