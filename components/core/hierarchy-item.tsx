"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Building2, ChevronDown, Home, AppWindow } from "lucide-react";
import React from "react";

import { AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";
import { ProjectNode , hasChildren } from "@/types/tracking-types";


import { LineItemView } from "./line-item-view";

interface HierarchyItemProps {
  node: ProjectNode;
  level: number;

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

  showQuantity,
}: HierarchyItemProps) {




  const icon = levelIcons[level] || levelIcons[levelIcons.length - 1];

  if (!hasChildren(node)) {
    return (
      <LineItemView
        item={node}
       
        showQuantity={showQuantity}
      />
    );
  }

  return (
    <AccordionItem value={node.id}>
      <AccordionPrimitive.Header className="flex w-full">
        <div className="flex items-center flex-1 hover:bg-secondary/50 rounded-md px-3 py-2 text-md font-semibold">
          <Checkbox
           
           
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
            <div className="flex items-center gap-3 ml-auto w-1/2 max-w-xs shrink-0">
              <Progress  className="h-3 flex-1" />
              <span className="text-sm font-mono w-24 text-right text-muted-foreground">
                
              </span>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 ml-3" />
          </AccordionPrimitive.Trigger>
        </div>
      </AccordionPrimitive.Header>
      <AccordionContent className="pl-6 border-l-2 border-primary/20 ml-5">
        <div className="space-y-1 py-2">
          {node.children.map((child) =>
            hasChildren(child) ? (
              <HierarchyItem
                key={child.id}
                node={child}
                level={level + 1}
               
                showQuantity={showQuantity}
              />
            ) : (
              <LineItemView
                key={child.id}
                item={child}
                
                showQuantity={showQuantity}
              />
            )
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
