"use client"
import React from 'react';
import {tableComponentTypes} from "@/types/tableTypes";

const TableComponent = ({theadData, tbodyData}: tableComponentTypes): JSX.Element => {

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                <tr className="bg-gray-100">
                    {
                        theadData.map((item, index) => (
                            <th key={index} className="px-4 py-2">
                                {item.name}
                            </th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    tbodyData.map((items, index) => {
                            return (
                                <tr key={`${index}-${items.id}`}>
                                    {
                                        Object.keys(items).map((key: string, _idx: number) => (
                                            (

                                                <td key={`${index}-${key}`} className="border px-4 py-2">
                                                    {(items as any)[key]}
                                                </td>
                                            )
                                        ))
                                    }
                                </tr>
                            )
                        }
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export {
    TableComponent
}

