
export interface IProdinvnt{
    id:   number,
    productname: string,
    category: string,
    availableunits: number,
    unitprice: number,
    tags: string,
    lastupdate: number,
    location: {
        area: string,
        zone: string,
        shelf: string},
    description: string
}