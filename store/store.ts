import { create } from "zustand";
import type { Floor,ProjectNode } from "@/types/tracking-types";

interface ProjectData {
  typical: Floor[];
  withQuantity: Floor[];
  withoutQuantity: Floor[];
}

interface ProtrackState {
  data: ProjectData;
  
  expandedItems: string[];
  activeTab: string;
}

interface ProtrackActions {
  setData: (data: ProjectData) => void;
  setExpandedItems: (items: string[] | ((prev: string[]) => string[])) => void;
  setActiveTab: (tab: string) => void;

}

const initialState: ProtrackState = {
  data: {
    typical: [],
    withQuantity: [],
    withoutQuantity: [],
  },

  expandedItems: [],
  activeTab: "typical",
};

export const useProtrackStore = create<ProtrackState & ProtrackActions>(
  (set) => ({
    ...initialState,
    setData: (data) => set({ data }),
    setExpandedItems: (items) => {
      set((state) => ({
        expandedItems:
          typeof items === "function" ? items(state.expandedItems) : items,
      }));
    },
    setActiveTab: (tab) => set({ activeTab: tab, expandedItems: [] }), // Also reset expanded items on tab change
    
  })
);
