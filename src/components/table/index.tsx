import React, { useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps, TablePaginationConfig } from 'antd';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

type tableProps<data> = {
    columns: TableColumnsType<data>
    dataSource: data[]
    withSelectableRows?: boolean;
    selectedRowKeys?: React.Key[]
    onSelectChange?: (keys: React.Key[]) => void
    pagination?: TablePaginationConfig
    scroll?: any
}

const index = <data extends object>({ columns, dataSource, withSelectableRows = false, selectedRowKeys, onSelectChange, pagination, scroll = { x: 'max-content' } }: tableProps<data>) => {
    const [selectRowKeys, setSelectRowKey] = useState<React.Key[]>([]);

    const keys = selectedRowKeys ?? selectRowKeys;
    const onChange = onSelectChange ?? setSelectRowKey;

    const rowSelection: TableRowSelection<data> = {
        selectedRowKeys: keys,
        onChange: onChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    const newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 === 0);
                    onChange(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    const newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 !== 0);
                    onChange(newSelectedRowKeys);
                },
            },
        ],
    };

    return <Table
        rowKey="id"
        rowSelection={withSelectableRows ? rowSelection : undefined}
        columns={columns}
        dataSource={dataSource}
        scroll={scroll}
        // pagination={{
        //     position: ['bottomCenter'],
        //     ...pagination,
        // }}
        pagination={false}

    />;
};

export default index;