"use client";

import { useMemo } from "react";
import { ProjectNode, hasChildren, getLeafIds } from "@/types/tracking-types";

export const useNodeState = (node: ProjectNode, completedIds: Set<string>) => {
  const state = useMemo(() => {
    if (!hasChildren(node)) {
      const isCompleted = completedIds.has(node.id);
      return {
        progress: isCompleted ? 100 : 0,
        checkboxState: isCompleted ? "checked" : "unchecked",
        totalCount: 1,
        completedCount: isCompleted ? 1 : 0,
      };
    }

    const leafIds = getLeafIds(node);
    const totalCount = leafIds.length;
    if (totalCount === 0) {
      return {
        progress: 0,
        checkboxState: "unchecked",
        totalCount: 0,
        completedCount: 0,
      };
    }

    const completedCount = leafIds.filter((id) => completedIds.has(id)).length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    let checkboxState: "checked" | "unchecked" | "indeterminate" =
      "indeterminate";
    if (completedCount === totalCount && totalCount > 0) {
      checkboxState = "checked";
    } else if (completedCount === 0) {
      checkboxState = "unchecked";
    }

    return { progress, checkboxState, totalCount, completedCount };
  }, [node, completedIds]);

  return state;
};
