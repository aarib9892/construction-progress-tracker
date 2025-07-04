"use client";

import React, { useEffect, useMemo } from "react";
import { Floor , hasChildren, ProjectNode } from "@/types/tracking-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronsDown,
  ChevronsUp,
  ClipboardList,
  RotateCcw,
} from "lucide-react";
import { ProgressView } from "./progress-view";
import { useProtrackStore } from "@/store/store";

interface ProjectDashboardProps {
  initialData: {
    typical: Floor[];
    withQuantity: Floor[];
    withoutQuantity: Floor[];
  };
}

const getAllAccordionsIds = (data:Floor[]):string[] =>{
    let ids:string[] = []
    const dig = (nodes:ProjectNode[])=>{
        for (const node of nodes) {
            if (hasChildren(node)) {
                ids.push(node.id)
                dig(node.children)
                
            }
        }


    }

    dig(data)
    return ids


}



export function Dashboard({ initialData }: ProjectDashboardProps) {
    const {data , setData , activeTab , setActiveTab , expandedItems,setExpandedItems}  = useProtrackStore()

    useEffect(() => {
        setData(initialData)
    }, [initialData]);

    const allTypicalIds:string[] = getAllAccordionsIds(data.typical)
    const allWithQuantityIds: string[] = getAllAccordionsIds(data.withQuantity);
    const allWithoutQuantity: string[] = getAllAccordionsIds(data.withoutQuantity);

    const handleExpandAll=() => {
        
        if(activeTab === 'typical') {
            setExpandedItems(allTypicalIds)
        }else if(activeTab === 'withQuantity'){
            setExpandedItems(allWithQuantityIds)
        }else{
            setExpandedItems(allWithoutQuantity)
        }
    }

    const handleCollapseAll= () =>{
        setExpandedItems([])

    }


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
          <div className="flex items-center gap-2">
            <Button onClick={handleExpandAll} variant="outline" size="sm">
              <ChevronsDown className="mr-2 h-4 w-4" /> Expand All
            </Button>
            <Button onClick={handleCollapseAll} variant="outline" size="sm">
              <ChevronsUp className="mr-2 h-4 w-4" /> Collapse All
            </Button>
            {/* <Button variant="outline" size="sm">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button> */}
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
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-4">
              <TabsTrigger value="typical">Typical Areas</TabsTrigger>
              <TabsTrigger value="withQuantity">
                Other Areas (with Quantity)
              </TabsTrigger>
              <TabsTrigger value="withoutQuantity">
                Other Areas (w/o Quantity)
              </TabsTrigger>
            </TabsList>
            <Card className="shadow-md">
              <CardContent className="p-2 sm:p-4">
                <TabsContent value="typical">
                  <ProgressView
                    expandedItems={expandedItems}
                    setExpandedItems={setExpandedItems}
                    data={data.typical}
                  />
                </TabsContent>
                <TabsContent value="withQuantity">
                  <ProgressView
                    expandedItems={expandedItems}
                    setExpandedItems={setExpandedItems}
                    data={data.withQuantity}
                  />
                </TabsContent>
                <TabsContent value="withoutQuantity">
                  <ProgressView
                    expandedItems={expandedItems}
                    setExpandedItems={setExpandedItems}
                    data={data.withoutQuantity}
                  />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
