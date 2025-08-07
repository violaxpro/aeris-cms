
import React, { useState } from 'react';
import Avatar from '@/components/avatar'
import { Tree, TreeNode } from 'react-organizational-chart';

type Person = {
    name: string;
    title: string;
    image: any;
};

type NodeData = {
    label?: string;
    type?: string;
    data?: Person;
    children?: NodeData[];
};

type OrganizationalType = {
    data: NodeData;
};

export default function OrganizationalChart({ data }: OrganizationalType) {
    const [selection, setSelection] = useState([]);

    const nodeTemplate = (node: any) => {
        if (node.type === 'person') {
            return (
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center gap-3">
                        <div className='w-20'>
                            <Avatar style={{ backgroundColor: '#87d068' }} url={node.data.image} size={64} />
                        </div>
                        <div className='flex flex-col'>
                            <span className="font-bold mb-2">{node.data.name}</span>
                            <span>{node.data.title}</span>
                        </div>
                    </div>
                </div>
            );
        }

        return node.label;
    };

    const NodeCard = ({ data }: { data: any }) => {
        return (
            <div className="flex justify-center items-center gap-3 p-3">
                <div className="w-16">
                    <Avatar url={data.image} size={64} style={{ backgroundColor: '#87d068' }} />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">{data.name}</span>
                    <span className="text-sm text-gray-500">{data.title}</span>
                </div>
            </div>
        );
    };

    const RenderTree = ({ node }: { node: any }) => {
        return (
            <TreeNode
                className='!border-none'
                label={
                    node.type === 'person' && node.data ? (
                        <NodeCard data={node.data} />
                    ) : (
                        <div className="p-2 font-bold">{node.label}</div>
                    )
                }
            >
                {node.children &&
                    node.children.map((child: any, index: number) => (
                        <RenderTree key={index} node={child} />
                    ))}
            </TreeNode>
        );
    };

    // return (
    //     <div className="card overflow-x-auto">
    //         <OrganizationChart
    //             value={data}
    //             selectionMode="multiple"
    //             selection={selection}
    //             onSelectionChange={(e: any) => setSelection(e.data)}
    //             nodeTemplate={nodeTemplate}
    //             unstyled={false}
    //         />
    //     </div>
    // )
    return (
        <div className="overflow-x-auto py-8">
            <Tree
                lineWidth={'2px'}
                lineColor={'#ccc'}
                lineBorderRadius={'8px'}
                label={<NodeCard data={data.data!} />}
            >
                {data.children?.map((child, index) => (
                    <RenderTree key={index} node={child} />
                ))}
            </Tree>
        </div>
    );
}


