import { create } from "zustand";
import type { Floor, ProjectNode, LineItem } from "@/types/tracking-types";
import { getLeafIds, getLeafNodes } from "@/types/tracking-types";

interface ProjectData {
  typical: Floor[];
  withQuantity: Floor[];
  withoutQuantity: Floor[];
}

interface ProtrackState {
  data: ProjectData;
  completedIds: Set<string>;
  expandedItems: string[];
  activeTab: string;
  remarks: Map<string, string>;
}

interface ProtrackActions {
  setData: (data: ProjectData) => void;
  handleCheckChange: (node: ProjectNode, isChecked: boolean) => void;
  setExpandedItems: (items: string[] | ((prev: string[]) => string[])) => void;
  setActiveTab: (tab: string) => void;
  setRemark: (itemId: string, remark: string) => void;
  reset: () => void;
  saveState: () => void;
}

const initialState: ProtrackState = {
  data: {
    typical: [],
    withQuantity: [],
    withoutQuantity: [],
  },
  completedIds: new Set(),
  expandedItems: [],
  activeTab: "typical",
  remarks: new Map(),
};

export const useProtrackStore = create<ProtrackState & ProtrackActions>(
  (set, get) => ({
    ...initialState,
    setData: (data) => {
      const allItems: LineItem[] = [];
      Object.values(data).forEach((dataArray) => {
        dataArray.forEach((floor:Floor) => {
          allItems.push(...getLeafNodes(floor));
        });
      });

      let initialCompletedIds = new Set(
        allItems.filter((item) => item.isCompleted).map((item) => item.id)
      );
      let initialRemarks = new Map<string, string>();
      allItems.forEach((item) => {
        if (item.remarks) {
          initialRemarks.set(item.id, item.remarks);
        }
      });

      if (typeof window !== "undefined") {
        try {
          const savedCompletedIds = localStorage.getItem(
            "protrack_completedIds"
          );
          if (savedCompletedIds) {
            initialCompletedIds = new Set(JSON.parse(savedCompletedIds));
          }

          const savedRemarks = localStorage.getItem("protrack_remarks");
          if (savedRemarks) {
            initialRemarks = new Map(JSON.parse(savedRemarks));
          }
        } catch (e) {
          console.error("Failed to load state from localStorage", e);
        }
      }

      set({ data, completedIds: initialCompletedIds, remarks: initialRemarks });
    },
    handleCheckChange: (node, isChecked) => {
      set((state) => {
        const newCompletedIds = new Set(state.completedIds);
        const idsToUpdate = getLeafIds(node);

        if (isChecked) {
          idsToUpdate.forEach((id) => newCompletedIds.add(id));
        } else {
          idsToUpdate.forEach((id) => newCompletedIds.delete(id));
        }
        return { completedIds: newCompletedIds };
      });
    },
    setExpandedItems: (items) => {
      set((state) => ({
        expandedItems:
          typeof items === "function" ? items(state.expandedItems) : items,
      }));
    },
    setActiveTab: (tab) => set({ activeTab: tab, expandedItems: [] }), // Also reset expanded items on tab change
    setRemark: (itemId, remark) => {
      set((state) => {
        const newRemarks = new Map(state.remarks);
        newRemarks.set(itemId, remark);
        return { remarks: newRemarks };
      });
    },
    reset: () => {
      set((state) => {
        const { activeTab, data, completedIds, remarks } = state;

        let currentTabData: Floor[] = [];
        if (activeTab === "typical") {
          currentTabData = data.typical;
        } else if (activeTab === "withQuantity") {
          currentTabData = data.withQuantity;
        } else if (activeTab === "withoutQuantity") {
          currentTabData = data.withoutQuantity;
        }

        if (currentTabData.length === 0) {
          return {}; // No data for this tab, do nothing
        }

        const tabLeafIds = new Set(
          currentTabData.flatMap((floor) => getLeafIds(floor))
        );

        const newCompletedIds = new Set(completedIds);
        tabLeafIds.forEach((id) => {
          newCompletedIds.delete(id);
        });

        const newRemarks = new Map(remarks);
        tabLeafIds.forEach((id) => {
          newRemarks.delete(id);
        });

        return {
          completedIds: newCompletedIds,
          remarks: newRemarks,
          expandedItems: [], // Reset expanded items for the tab as well
        };
      });
    },
    saveState: () => {
      if (typeof window === "undefined") return;
      try {
        const { completedIds, remarks } = get();
        localStorage.setItem(
          "protrack_completedIds",
          JSON.stringify(Array.from(completedIds))
        );
        localStorage.setItem(
          "protrack_remarks",
          JSON.stringify(Array.from(remarks.entries()))
        );
      } catch (e) {
        console.error("Failed to save state to localStorage", e);
      }
    },
  })
);
