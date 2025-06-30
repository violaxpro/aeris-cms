import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ATTRIBUTE_SET } from '@/config/constants';

interface AttributeSetState {
  [key: string]: any;
}

export const defaultAttributeSet: AttributeSetState[] = [
  {
    value: '1',
    label: 'Attribute Set 1',
  },
  {
    value: '2',
    label: 'Attribute Set 2',
  },
];

export const attributeSetAtom = atomWithStorage(
  ATTRIBUTE_SET,
  defaultAttributeSet
);

export const setAttributeSetAtom = atom(
  null,
  (_get, set, data: AttributeSetState[]) => {
    return set(attributeSetAtom, data);
  }
);

export const deleteAttributeSetAtom = atom(null, (_get, set, data: string) => {
  const prev = _get(attributeSetAtom);
  return set(
    attributeSetAtom,
    prev.filter((item: any) => item.value !== data)
  );
});
