export interface LineItem {
  id: string;
  name: string;
  quantity?: number;
  unit?: string;
  status?: "COMPLETED" | "PENDING" | "IN_PROGRESS";
  isCompleted: boolean;
  remarks?: string;
}

export interface Area {
  id: string;
  name: string;
  children: LineItem[];
}

export interface Flat {
  id: string;
  name: string;
  children: Area[];
}

export interface Floor {
  id: string;
  name: string;
  children: Flat[];
}

export type ProjectNode = Floor | Flat | Area | LineItem;

export function hasChildren(node: ProjectNode): node is Floor | Flat | Area {
  return (
    "children" in node &&
    Array.isArray(node.children) &&
    node.children.length > 0
  );
}

// Helper to get all descendant leaf node (LineItem) objects under a given node
export const getLeafNodes = (node: ProjectNode): LineItem[] => {
  if (!hasChildren(node)) {
    return [node as LineItem];
  }
  return node.children.flatMap((child) => getLeafNodes(child as ProjectNode));
};

// Helper to get all descendant leaf node (LineItem) IDs under a given node
export const getLeafIds = (node: ProjectNode): string[] => {
  if (!hasChildren(node)) {
    return [node.id];
  }
  return node.children.flatMap((child) => getLeafIds(child as ProjectNode));
};
