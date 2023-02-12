import { NodeSection } from 'entities/node';

const isNodeExists = (nodeSections: NodeSection[], nodeAddress: string) => {
  const nodes = nodeSections.flatMap((section) => section.nodes);

  return nodes.some((node) => node.address === nodeAddress);
};

export { isNodeExists };
