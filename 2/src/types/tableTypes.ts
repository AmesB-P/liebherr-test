
export type tableHead = {
    key : string,
    name : string
    // push(param: { name: string | number; key: string | number }): void;
}

type tableBody = {

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
    id : string,
    materialId : number,
    value : number,
    unit : string
}

export type tableComponentTypes = {
    theadData : tableHead[] | [],
    tbodyData : customerTypes[] | sitesTypes[] | mixDesignsTypes[]  |  []
}