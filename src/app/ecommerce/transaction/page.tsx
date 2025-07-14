import React from 'react'
import TransactionList from '@/features/pages/sales/transaction'
import { getTransaction } from '@/services/transaction-service';
import { transactionDUmmy } from '@/plugins/types/sales-type';

export default async function TransactionPage() {
    let transaction = []
    try {
        const res = await getTransaction()
        transaction = res ? res.data : transactionDUmmy
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <div>
            <TransactionList transactionData={transaction} />
        </div>
    )
}

