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