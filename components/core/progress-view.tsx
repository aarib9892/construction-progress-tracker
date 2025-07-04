"use client";

import { Floor , ProjectNode } from "@/types/tracking-types";
import { Accordion } from "@/components/ui/accordion";
import { HierarchyItem } from "./hierarchy-item";

interface ProgressViewProps {
  data: Floor[];

  expandedItems: string[];
  setExpandedItems: (items: string[]) => void;
  showQuantity?: boolean;
}

export function ProgressView({
  data,

  expandedItems,
  setExpandedItems,
  showQuantity = false,
}: ProgressViewProps) {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No data available for this category.
      </div>
    );
  }

  return (
    <Accordion
      type="multiple"
      value={expandedItems}
      onValueChange={setExpandedItems}
      className="w-full"
    >
      {data.map((floor) => (
        <HierarchyItem
          key={floor.id}
          node={floor}
          level={0}
  
          showQuantity={showQuantity}
        />
      ))}
    </Accordion>
  );
}
