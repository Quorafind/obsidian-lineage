import { findNodeColumn } from '../../../../../helpers/find-node-column';
import { createNode } from '../../../../../helpers/create-node';
import { Columns, NodeId } from 'src/stores/view/view-state-type';
import { id } from 'src/helpers/id';
import { sortGroups } from 'src/stores/view/reducers/document/state/helpers/sort-groups';

export const insertChild = (
    columns: Columns,
    nodeIdOfParent: string,
    __newNodeID__?: string,
) => {
    const parentColumnIndex = findNodeColumn(columns, nodeIdOfParent);
    let createdNode: NodeId | null = null;
    if (parentColumnIndex !== -1) {
        const childColumnIndex = parentColumnIndex + 1;
        createdNode = createNode(__newNodeID__);

        if (columns[childColumnIndex]) {
            const childColumn = columns[childColumnIndex];
            const childGroup = childColumn.groups.find(
                (g) => g.parentId === nodeIdOfParent,
            );
            if (childGroup) {
                childGroup.nodes.push(createdNode);
            } else {
                childColumn.groups.push({
                    nodes: [createdNode],
                    parentId: nodeIdOfParent,
                });
            }
            childColumn.groups = sortGroups(
                columns[parentColumnIndex].groups,
                childColumn.groups,
            );
        } else {
            columns.push({
                id: id.column(),
                groups: [
                    {
                        nodes: [createdNode],
                        parentId: nodeIdOfParent,
                    },
                ],
            });
        }
    }
    return createdNode;
};