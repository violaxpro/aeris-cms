
import { atom } from 'jotai'
import { WarehouseBranchListType } from '@/plugins/types/warehouse-type'

export const branchListAtom = atom<WarehouseBranchListType[]>([])
