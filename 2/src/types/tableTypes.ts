
export type tableHead = {
    key : string,
    name : string
    align? : string,
    children? : tHeadChildrenTypes[] | unknown[] | []
    // push(param: { name: string | number; key: string | number }): void;
}

type tHeadChildrenTypes ={
    key : string | number,
    name : string
}

type customerTypes = {
    id : string,
    customerName : string
}
type sitesTypes = {
    id : string,
    customerId : string,
    siteName : string,
    location : string
}


type mixDesignsTypes = {
    id : string,
    mixDesignCode : string,
    mixDesignDescription : string,
    strength : string,
    components : mixDesignsComponentTypes[],
}

type mixDesignsComponentTypes = {
    id : string | number,
    materialId : number,
    value : number,
    unit : string
}

export type tableComponentTypes = {
    theadData : tableHead[] | [],
    tbodyData : customerTypes[] | sitesTypes[] | mixDesignsTypes[]  |  []
}