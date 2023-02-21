import { useEffect } from 'react';
import SimpleBar from 'simplebar-react';

import { NodeSections } from 'entities/node';

import { Section } from '../section';
import styles from './NodesList.module.scss';

type Props = {
  nodeAddress: string;
  nodeSections: NodeSections;
  selectedNode: string;
  selectNode: (address: string) => void;
  removeLocalNode: (chain: string, address: string) => void;
};

const NodesList = (props: Props) => {
  const { nodeAddress, nodeSections, selectedNode, selectNode, removeLocalNode } = props;

  useEffect(() => {
    document.getElementById(selectedNode)?.scrollIntoView(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SimpleBar className={styles.simpleBar}>
      <ul className={styles.list}>
        {Object.entries(nodeSections).map(([chain, nodes]) => (
          <Section
            key={chain}
            heading={chain}
            nodes={nodes}
            nodeAddress={nodeAddress}
            selectedNode={selectedNode}
            selectNode={selectNode}
            removeLocalNode={(address: string) => removeLocalNode(chain, address)}
          />
        ))}
      </ul>
    </SimpleBar>
  );
};

export { NodesList };
