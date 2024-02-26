
export type tableHead = {
    key : string,
    name : string
    align? : string,
    children? : tHeadChildrenTypes[] | unknown[] | []
    // push(param: { name: string | number; key: string | number }): void;
}

export type tableBody = {
    tbodyData :  customerTypes[] | sitesTypes[] | mixDesignsTypes[]  |  [],
}

type tHeadChildrenTypes ={
    key : string | number,
    name : string
}

export type customerTypes = {
    id : string,
    customerName : string
}
export type sitesTypes = {
    id : string,
    customerId : string,
    siteName : string,
    location : string
}


export type mixDesignsTypes = {
    id : string,
    mixDesignCode : string,
    mixDesignDescription : string,
    strength : string,
    components : mixDesignsComponentTypes[],
}

export type mixDesignsComponentTypes = {
    id : string | number,
    materialId : number,
    value : number,
    unit : string
}

export type tableComponentTypes = {
    theadData : tableHead[] | [],
    tbodyData : customerTypes[] | sitesTypes[] | mixDesignsTypes[]  |  [],
    handleChangePage? : Function,
    handleDelete? : Function,
    isUseActions? : boolean,
    handleEditCustomer? : Function | undefined,
    modeController? : any | undefined,
    isUseNo? : boolean
}

export type pagetinationTypes ={
    currentPage : number,
    totalPages : number,
    onPageChange? : Function
}