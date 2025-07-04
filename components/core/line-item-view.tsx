"use client";

import { LineItem , ProjectNode } from "@/types/tracking-types";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface LineItemViewProps {
  item: LineItem;

  showQuantity: boolean;
}

export function LineItemView({
  item,
 

  showQuantity,
}: LineItemViewProps) {


  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-secondary/50">
      <Checkbox
 
        aria-label={`Mark ${item.name} as complete`}
      />
      <label
        htmlFor={item.id}
        className="flex-grow text-sm text-foreground/90 cursor-pointer"
      >
        {item.name}
      </label>
      {showQuantity && item.quantity && (
        <Badge variant="secondary" className="font-mono">
          Qty: {item.quantity}
        </Badge>
      )}
    </div>
  );
}
