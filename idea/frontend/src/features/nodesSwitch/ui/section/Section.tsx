import { memo } from 'react';
import { Node } from 'entities/node';

import styles from './Section.module.scss';
import { Node as NodeItem } from '../node';

type Props = {
  heading: string;
  nodes: Node[];
  nodeAddress: string;
  selectedNode: string;
  selectNode: (address: string) => void;
  removeLocalNode: (address: string) => void;
};

const Section = memo((props: Props) => {
  const { heading, nodes, nodeAddress, selectedNode, selectNode, removeLocalNode } = props;

  const getNodes = () =>
    nodes.map(({ address, isCustom }) => (
      <NodeItem
        key={address}
        address={address}
        isCustom={isCustom}
        nodeAddress={nodeAddress}
        selectedNode={selectedNode}
        selectNode={selectNode}
        removeLocalNode={removeLocalNode}
      />
    ));

  return (
    <li>
      <h2 className={styles.caption}>{heading}</h2>
      <ul className={styles.sectionList}>{getNodes()}</ul>
    </li>
  );
});

export { Section };
