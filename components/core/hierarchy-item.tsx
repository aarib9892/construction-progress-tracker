"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Building2, ChevronDown, Home, AppWindow } from "lucide-react";
import React from "react";

import { AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useNodeState } from "@/hooks/use-node-state";
import { cn } from "@/lib/utils";
import type { ProjectNode, LineItem } from "@/types/tracking-types";
import { hasChildren } from "@/types/tracking-types";

import { LineItemView } from "./line-item-view";

interface HierarchyItemProps {
  node: ProjectNode;
  level: number;
  completedIds: Set<string>;
  onCheckChange: (node: ProjectNode, isChecked: boolean) => void;
  showQuantity: boolean;
}

const levelIcons = [
  <Building2 key="l0" className="h-5 w-5 text-primary" />,
  <Home key="l1" className="h-5 w-5 text-primary/80" />,
  <AppWindow key="l2" className="h-5 w-5 text-primary/60" />,
];

export function HierarchyItem({
  node,
  level,
  completedIds,
  onCheckChange,
  showQuantity,
}: HierarchyItemProps) {
  const { progress, checkboxState } = useNodeState(node, completedIds);

  const handleCheckboxChange = (isChecked: boolean | "indeterminate") => {
    const shouldCheckAll = checkboxState !== "checked";
    onCheckChange(node, shouldCheckAll);
  };

  const icon = levelIcons[level] || levelIcons[levelIcons.length - 1];

  if (!hasChildren(node)) {
    // A node without children (a LineItem) should not be rendered as a full HierarchyItem accordion.
    // It will be rendered by its parent within the AccordionContent.
    return null;
  }

  const areChildrenLineItems =
    hasChildren(node) &&
    node.children.length > 0 &&
    !hasChildren(node.children[0]);

  return (
    <AccordionItem value={node.id}>
      <AccordionPrimitive.Header className="flex w-full">
        <div className="flex items-center flex-1 hover:bg-secondary/50 rounded-md px-3 py-2 text-md font-semibold">
          <Checkbox
            checked={
              checkboxState === "checked"
                ? true
                : checkboxState === "indeterminate"
                ? "indeterminate"
                : false
            }
            onCheckedChange={handleCheckboxChange}
            aria-label={`Mark all items in ${node.name} as complete`}
          />
          <AccordionPrimitive.Trigger
            className={cn(
              "flex flex-1 items-center justify-between text-left ml-3 [&[data-state=open]>svg]:rotate-180"
            )}
          >
            <div className="flex items-center gap-3 flex-grow min-w-0">
              {icon}
              <span className="truncate font-headline">{node.name}</span>
            </div>
            <div className="flex items-center gap-2 ml-auto shrink-0">
              <Progress value={progress} className="h-3 w-12 sm:w-20" />
              <span className="text-sm font-mono w-12 text-right text-muted-foreground">
                {`${Math.round(progress)}%`}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 ml-3" />
          </AccordionPrimitive.Trigger>
        </div>
      </AccordionPrimitive.Header>
      <AccordionContent className="pl-10 border-l-2 border-primary/20 ml-[1.125rem]">
        {areChildrenLineItems ? (
          <div className="overflow-x-auto py-2">
            <div className="min-w-[40rem]">
              {/* Header */}
              <div className="grid grid-cols-12 items-center gap-4 py-2 px-1 border-b">
                <div className="col-span-3 text-xs font-bold uppercase text-muted-foreground tracking-wider">
                  Line Item
                </div>
                <div className="col-span-2 text-center text-xs font-bold uppercase text-muted-foreground tracking-wider">
                  Planned Qty
                </div>
                <div className="col-span-2 text-center text-xs font-bold uppercase text-muted-foreground tracking-wider">
                  Status
                </div>
                <div className="col-span-1 text-center text-xs font-bold uppercase text-muted-foreground tracking-wider">
                  Done
                </div>
                <div className="col-span-4 text-xs font-bold uppercase text-muted-foreground tracking-wider">
                  Remarks
                </div>
              </div>

              {/* Line Items */}
              <div className="divide-y divide-border">
                {(node.children as LineItem[]).map((child) => (
                  <LineItemView
                    key={child.id}
                    item={child}
                    completedIds={completedIds}
                    onCheckChange={onCheckChange}
                    showQuantity={showQuantity}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1 py-2">
            {node.children.map((child) => (
              <HierarchyItem
                key={child.id}
                node={child}
                level={level + 1}
                completedIds={completedIds}
                onCheckChange={onCheckChange}
                showQuantity={showQuantity}
              />
            ))}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
