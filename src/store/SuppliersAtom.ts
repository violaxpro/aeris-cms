
import { atom } from 'jotai'
import {
    SupplierListType,
    CreditSupplierType,
    ReturnSupplierType,
    PurchasesType,
    BillType
} from '@/plugins/types/suppliers-type'

export const supplierListAtom = atom<SupplierListType[]>([])
export const creditSupplierAtom = atom<CreditSupplierType[]>([])
export const returnSupplierAtom = atom<ReturnSupplierType[]>([])
export const purchaseSupplierAtom = atom<PurchasesType[]>([])
export const billAtom = atom<BillType[]>([])
export const goodReceiptAtom = atom<any[]>([])



