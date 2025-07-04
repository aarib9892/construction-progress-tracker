export interface LineItem {
  id: string;
  name: string;
  quantity?: number;
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
  


