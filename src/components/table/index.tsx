import React, { useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps, TablePaginationConfig } from 'antd';
import { CaretDownIcon, CaretRightIcon } from '@public/icon';
import Image from 'next/image';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

type tableProps<data> = {
    columns: TableColumnsType<data>
    dataSource: data[]
    withSelectableRows?: boolean;
    selectedRowKeys?: React.Key[]
    onSelectChange?: (keys: React.Key[]) => void
    pagination?: TablePaginationConfig
    scroll?: any
    expandable?: TableProps<data>['expandable']
}

const index = <data extends object>({
    columns,
    dataSource,
    withSelectableRows = false,
    selectedRowKeys,
    onSelectChange,
    pagination,
    scroll = { x: 'max-content' },
    expandable
}: tableProps<data>) => {
    const [selectRowKeys, setSelectRowKey] = useState<React.Key[]>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]);

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
        expandable={
            expandable
                ? {
                    expandedRowKeys,
                    onExpand: (expanded: any, record: any) => {
                        setExpandedRowKeys(expanded ? [record.id] : []);
                    },
                    expandIcon: ({ expanded, onExpand, record }) =>
                        expanded ? (
                            <Image
                                src={CaretDownIcon}
                                alt='caret-down-icon'
                                onClick={(e) => onExpand(record, e)}
                            />
                        ) : (
                            <Image
                                src={CaretRightIcon}
                                alt='caret-right-icon'
                                onClick={(e) => onExpand(record, e)}
                            />
                        ),
                    ...expandable
                }
                : undefined
        }


    />;
};

export default index;