import { NodeSections, Node } from 'entities/node';
import { LocalStorage } from 'shared/config';

const getLocalNodeSections = () => {
  const nodes = localStorage.getItem(LocalStorage.Nodes);

  return nodes ? (JSON.parse(nodes) as NodeSections) : undefined;
};

const getMergedNodeSections = (nodeSections: NodeSections, localNodeSections: NodeSections) => {
  const map = new Map<string, Node[]>();

  Object.entries(nodeSections).forEach(([chain, nodes]) => map.set(chain, nodes));
  Object.entries(localNodeSections).forEach(([chain, localNodes]) => {
    const nodes = map.get(chain);

    map.set(chain, nodes ? nodes.concat(localNodes) : localNodes);
  });

  return Object.fromEntries(map);
};

export { getLocalNodeSections, getMergedNodeSections };
