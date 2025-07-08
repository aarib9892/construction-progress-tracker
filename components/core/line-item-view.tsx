"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useProtrackStore } from "@/store/store";
import type { LineItem, ProjectNode } from "@/types/tracking-types";
import React from "react";

interface LineItemViewProps {
  item: LineItem;
  completedIds: Set<string>;
  onCheckChange: (node: ProjectNode, isChecked: boolean) => void;
  showQuantity: boolean;
}

export function LineItemView({
  item,
  completedIds,
  onCheckChange,
  showQuantity,
}: LineItemViewProps) {
  const setRemark = useProtrackStore((state) => state.setRemark);
  const remark = useProtrackStore((state) => state.remarks.get(item.id) || "");

  const isCompleted = completedIds.has(item.id);

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    onCheckChange(item, !!checked);
  };

  const handleRemarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemark(item.id, e.target.value);
  };

  const plannedQty =
    showQuantity && typeof item.quantity === "number"
      ? `${item.quantity} ${item.unit || ""}`.trim()
      : "-";

  const statusBadge = (
    <Badge
      variant={
        item.status === "COMPLETED"
          ? "default"
          : item.status === "IN_PROGRESS"
          ? "outline"
          : "secondary"
      }
      className="text-xs capitalize w-28 justify-center"
    >
      {(item.status || "pending").replace("_", " ").toLowerCase()}
    </Badge>
  );

  const completionCheckbox = (
    <Checkbox
      checked={isCompleted}
      onCheckedChange={handleCheckboxChange}
      aria-label={`Mark ${item.name} as complete`}
    />
  );

  const remarksInput = (
    <Input
      placeholder="Enter remarks"
      value={remark}
      onChange={handleRemarkChange}
      className="h-8 text-sm"
    />
  );

  return (
    <div className="grid grid-cols-12 items-center gap-4 py-3 px-1">
      <div className="col-span-3 text-sm text-foreground/90">{item.name}</div>
      <div className="col-span-2 text-center text-sm font-mono text-muted-foreground">
        {plannedQty}
      </div>
      <div className="col-span-2 flex justify-center">{statusBadge}</div>
      <div className="col-span-1 flex justify-center">{completionCheckbox}</div>
      <div className="col-span-4">{remarksInput}</div>
    </div>
  );
}
