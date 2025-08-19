
import { atom } from 'jotai'
import { WarehouseBranchListType, InventoryListType } from '@/plugins/types/warehouse-type'

export const branchListAtom = atom<WarehouseBranchListType[]>([])

export const inventoryListAtom = atom<InventoryListType[]>([])
