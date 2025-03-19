import { useModal } from '@/app/shared/modal-views/use-modal';
import { attributeSetAtom, setAttributeSetAtom } from '@/store/attributeSet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useSetAtom } from 'jotai';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Input, Title } from 'rizzui';
import { z } from 'zod';

interface IForm {
  label: string;
  value: string;
}

const formSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export default function ModalAddNewAttributeSet() {
  const { closeModal } = useModal();

  const setAttributeSet = useSetAtom(setAttributeSetAtom);

  const [value] = useAtom(attributeSetAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ resolver: zodResolver(formSchema) });

  const onSubmit = (data: IForm) => {
    const dataForm = { ...data, value: data.value.toLowerCase() };
    setAttributeSet([...value, dataForm]);
    closeModal();
  };

  return (
    <div className="w-full rounded-md p-6">
      <div className="flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Add New Attribute Set
        </Title>
        <ActionIcon variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 flex flex-col gap-4">
          <Input {...register('label')} label="Label" />
          <Input {...register('value')} label="Value" />
          <div className="flex justify-end gap-2">
            <Button variant="outline" color="danger">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
