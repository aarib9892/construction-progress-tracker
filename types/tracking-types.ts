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

