"use client";

import React, { useEffect, useMemo } from "react";
import type { Floor, ProjectNode } from "@/types/tracking-types";
import { hasChildren } from "@/types/tracking-types";
import { useProtrackStore } from "@/store/store";
import { toast } from "sonner";
import { ProgressView } from "./progress-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import {
  ChevronsDown,
  ChevronsUp,
  ClipboardList,
  RotateCcw,
  Save,
} from "lucide-react";

interface ProjectDashboardProps {
  initialData: {
    typical: Floor[];
    withQuantity: Floor[];
    withoutQuantity: Floor[];
  };
}

const getAllAccordionIds = (data: Floor[]): string[] => {
  let ids: string[] = [];
  const traverse = (nodes: ProjectNode[]) => {
    for (const node of nodes) {
      if (hasChildren(node)) {
        ids.push(node.id);
        traverse(node.children);
      }
    }
  };
  traverse(data);
  return ids;
};

export function Dashboard({ initialData }: ProjectDashboardProps) {
  const {
    data,
    setData,
    completedIds,
    expandedItems,
    activeTab,
    handleCheckChange,
    setExpandedItems,
    setActiveTab,
    reset,
    saveState,
  } = useProtrackStore();


  useEffect(() => {
    setData(initialData);
  }, [initialData, setData]);

  const allTypicalIds = useMemo(
    () => getAllAccordionIds(data.typical),
    [data.typical]
  );
  const allWithQuantityIds = useMemo(
    () => getAllAccordionIds(data.withQuantity),
    [data.withQuantity]
  );
  const allWithoutQuantityIds = useMemo(
    () => getAllAccordionIds(data.withoutQuantity),
    [data.withoutQuantity]
  );

  const handleExpandAll = () => {
    if (activeTab === "typical") setExpandedItems(allTypicalIds);
    else if (activeTab === "withQuantity") setExpandedItems(allWithQuantityIds);
    else setExpandedItems(allWithoutQuantityIds);
  };

  const handleCollapseAll = () => {
    setExpandedItems([]);
  };

  const handleSave = () => {
    saveState();
    toast('Progress Saved',{
      
      description: "Your changes have been saved to your browser.",
    });
  };

  const recentActivity = useMemo(() => {
    let activity = "Completed tasks:\n";
    const findItem = (id: string, nodes: ProjectNode[]): ProjectNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (hasChildren(node)) {
          const found = findItem(id, node.children);
          if (found) return found;
        }
      }
      return null;
    };
    const allData = [
      ...data.typical,
      ...data.withQuantity,
      ...data.withoutQuantity,
    ];
    completedIds.forEach((id) => {
      const item = findItem(id, allData);
      if (item) activity += `- ${item.name}\n`;
    });
    return activity.length > 20 ? activity : "No tasks completed recently.";
  }, [completedIds, data]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-body">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-10 w-10 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground font-headline">
                ProTrack
              </h1>
              <p className="text-muted-foreground">
                Construction Progress Tracking Dashboard
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="default" size="sm" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Progress
            </Button>
            <Button variant="outline" size="sm" onClick={handleExpandAll}>
              <ChevronsDown className="mr-2 h-4 w-4" /> Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={handleCollapseAll}>
              <ChevronsUp className="mr-2 h-4 w-4" /> Collapse All
            </Button>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" /> Reset Tab
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="h-auto w-full grid grid-cols-1 sm:grid-cols-3">
              <TabsTrigger value="typical">Typical Areas</TabsTrigger>
              <TabsTrigger value="withQuantity">
                Other Areas (with Quantity)
              </TabsTrigger>
              <TabsTrigger value="withoutQuantity">
                Other Areas (w/o Quantity)
              </TabsTrigger>
            </TabsList>
            <Card className="shadow-md mt-4">
              <CardContent className="p-2 sm:p-4">
                <TabsContent value="typical">
                  <ProgressView
                    data={data.typical}
                    completedIds={completedIds}
                    onCheckChange={handleCheckChange}
                    expandedItems={expandedItems}
                    setExpandedItems={setExpandedItems}
                    showQuantity
                  />
                </TabsContent>
                <TabsContent value="withQuantity">
                  <ProgressView
                    data={data.withQuantity}
                    completedIds={completedIds}
                    onCheckChange={handleCheckChange}
                    expandedItems={expandedItems}
                    setExpandedItems={setExpandedItems}
                    showQuantity
                  />
                </TabsContent>
                <TabsContent value="withoutQuantity">
                  <ProgressView
                    data={data.withoutQuantity}
                    completedIds={completedIds}
                    onCheckChange={handleCheckChange}
                    expandedItems={expandedItems}
                    setExpandedItems={setExpandedItems}
                  />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
