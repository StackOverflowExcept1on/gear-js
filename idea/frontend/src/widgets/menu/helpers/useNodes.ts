import { useEffect, useMemo, useState } from 'react';
import { useAlert } from '@gear-js/react-hooks';

import { getNodes } from 'api';
import { NodeSections } from 'entities/node';

import { getLocalNodeSections, getMergedNodeSections } from './helpers';

const useNodes = () => {
  const alert = useAlert();

  const [isNodesLoading, setIsNodesLoading] = useState(true);

  const [fetchedNodeSections, setFetchedNodeSections] = useState<NodeSections>();
  const [localNodeSections, setLocalNodeSections] = useState(getLocalNodeSections());

  const addNode = (chain: string, address: string) => {
    const node = { isCustom: true, address };

    setLocalNodeSections((prevNodeSections) =>
      prevNodeSections ? { ...prevNodeSections, [chain]: [...prevNodeSections[chain], node] } : prevNodeSections,
    );
  };

  const removeNode = (chain: string, address: string) => {
    setLocalNodeSections((prevNodeSections) =>
      prevNodeSections
        ? { ...prevNodeSections, [chain]: prevNodeSections[chain].filter((node) => node.address !== address) }
        : prevNodeSections,
    );
  };

  useEffect(() => {
    getNodes()
      .then((result) => setFetchedNodeSections(result))
      .catch(({ message }: Error) => alert.error(message))
      .finally(() => setIsNodesLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nodeSections = useMemo(
    () =>
      fetchedNodeSections && localNodeSections
        ? getMergedNodeSections(fetchedNodeSections, localNodeSections)
        : fetchedNodeSections,
    [fetchedNodeSections, localNodeSections],
  );

  return { isNodesLoading, nodeSections, addNode, removeNode };
};

export { useNodes };
