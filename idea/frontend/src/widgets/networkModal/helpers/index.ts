import { NodeSections } from 'entities/node';

const isNodeExists = (nodeSections: NodeSections, nodeAddress: string) =>
  Object.values(nodeSections)
    .flat()
    .some((node) => node.address === nodeAddress);

export { isNodeExists };
