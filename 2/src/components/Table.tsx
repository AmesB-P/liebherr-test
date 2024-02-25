"use client"
import React from 'react';
import {tableComponentTypes} from "@/types/tableTypes";
import {isArray} from "lodash";

const TableComponent = ({theadData, tbodyData}: tableComponentTypes): JSX.Element => {

    return (
        <div className="overflow-x-auto">
            <table className="table-auto overflow-x-auto w-full border-separate border border-gray-200">
                <thead>
                <tr className="bg-gray-100">
                    {
                        theadData.map((item, index) => (
                            <th key={index} scope={"col"} colSpan={item?.children ? theadData.length : 1} className={`px-4 py-2 text-${item.align}`}>
                                {item.name}
                            </th>
                        ))
                    }
                </tr>
                </thead>

                <tbody>
                {
                    tbodyData ? (
                        tbodyData.map((items, index) => {
                                return (
                                    <tr key={`${index}-${items.id}`}>
                                        {
                                            Object.keys(items).map((key: string, _idx: number) =>
                                                isArray((items as any)[key]) ? (
                                                    <td key={`components-${index}-${_idx}`}>
                                                        {
                                                            (items as any)[key].map((child :any) =>(
                                                                    <div className={"flex w-full justify-between"} key={`child-${child.id}`}>
                                                                        material id : {child.materialId} , unit : {child.unit} , value : {child.value}
                                                                    </div>
                                                                )
                                                            )
                                                        }
                                                    </td>
                                                ) : (
                                                    <td key={`${index}-${key}`} className="border px-4 py-2">
                                                        {(items as any)[key]}
                                                    </td>
                                                )
                                            )
                                        }
                                    </tr>
                                )
                            }
                        )
                    ) : (
                        <tr>
                            <>Loading</>
                        </tr>
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

