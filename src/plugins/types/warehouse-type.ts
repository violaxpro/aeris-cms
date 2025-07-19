export type InventoryListType = {
    id?: number | string | undefined
    sku: string
    thumbnail: string
    name: string
    in_stock: string
    waiting?: boolean
    sold?: number
    added?: string;
};

export type WarehouseBranchListType = {
    id?: number | string | undefined
    name: string
    address: string
    phone_number: string
    email: string
};