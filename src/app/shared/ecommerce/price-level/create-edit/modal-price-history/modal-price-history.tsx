import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Title } from 'rizzui';
import PriceHistoryTable from './table';

const ModalPriceHistory = () => {
  const { closeModal } = useModal();

  return (
    <div className="w-full rounded-md p-6">
      <div className="flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Price History
        </Title>
        <ActionIcon variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>
      <PriceHistoryTable />
    </div>
  );
};

export default ModalPriceHistory;
