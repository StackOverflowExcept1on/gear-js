type Node = {
  isCustom: boolean;
  address: string;
};

type NodeSections = {
  [chain: string]: Node[];
};

export type { Node, NodeSections };
