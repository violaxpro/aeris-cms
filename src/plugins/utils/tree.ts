import { FlatNode, TreeNode, categoriesType } from "../types/treeTypes";

export default function buildTree(flatData: FlatNode[]): TreeNode[] {
    const idMapping: Record<string | number, TreeNode> = {};
    const tree: TreeNode[] = [];

    // Buat map id ➜ node
    flatData.forEach(item => {
        console.log(item)
        idMapping[item.id] = {
            key: item.id,
            text: item.name,
            title: item.name,
            children: [],
            categoriesData : item as categoriesType
        };
    });

    flatData.forEach(item => {
        if (item.parent === '#' || item.parent === null) {
            tree.push(idMapping[item.id]);
        } else {
            const parentNode = idMapping[item.parent];
            if (parentNode) {
                parentNode.children = parentNode.children || [];
                parentNode.children.push(idMapping[item.id]);
            } else {
                tree.push(idMapping[item.id]);
            }
        }
    });

    return tree;
}
