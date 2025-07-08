import type { Floor, Flat, Area, LineItem } from "@/types/tracking-types";

const rawData = {
  project: {
    id: "proj_001",
    name: "Residential Tower A - Mumbai",
    location: "Bandra West, Mumbai, Maharashtra",
    startDate: "2024-01-15",
    expectedCompletionDate: "2025-12-31",
    status: "IN_PROGRESS",
  },
  workOrder: {
    id: "WO-002",
    title: "Interior Finishing",
    description: "Complete interior finishing work for residential units",
    startDate: "2024-06-01",
    targetDate: "2024-12-31",
    supervisor: {
      id: "sup_001",
      name: "Rajesh Kumar",
      phone: "+91-9876543210",
      email: "rajesh.kumar@construction.com",
    },
  },
  progressSummary: {
    overallProgress: 34,
    lastUpdated: "2025-01-03T14:45:00Z",
    totalLineItems: 18,
    completedLineItems: 6,
    pendingLineItems: 10,
    inProgressLineItems: 2,
  },
  areas: {
    typical: {
      name: "Typical Areas",
      description: "Standard residential unit areas",
      floors: [
        {
          id: "floor1",
          name: "Floor 1",
          progress: 25,
          isCompleted: false,
          flats: [
            {
              id: "flat101",
              name: "Flat 101",
              progress: 50,
              isCompleted: false,
              areas: [
                {
                  id: "commontoilet101",
                  name: "Common Toilet",
                  progress: 50,
                  isCompleted: false,
                  lineItems: [
                    {
                      id: "li_001",
                      name: "Tile Installation",
                      category: "tile",
                      plannedQuantity: {
                        value: 25,
                        unit: "sqft",
                      },
                      status: "COMPLETED",
                      isCompleted: true,
                      remarks: "Quality approved",
                      completedDate: "2025-01-02T10:30:00Z",
                      assignedTo: "Tile Team A",
                    },
                    {
                      id: "li_002",
                      name: "Plumbing Fixtures",
                      category: "plumbing",
                      plannedQuantity: {
                        value: 3,
                        unit: "units",
                      },
                      status: "PENDING",
                      isCompleted: false,
                      remarks: "",
                      estimatedStartDate: "2025-01-05T09:00:00Z",
                      assignedTo: "Plumbing Team B",
                    },
                  ],
                },
                {
                  id: "mastertoilet101",
                  name: "Master Toilet",
                  progress: 50,
                  isCompleted: false,
                  lineItems: [
                    {
                      id: "li_003",
                      name: "Tile Installation",
                      category: "tile",
                      plannedQuantity: {
                        value: 30,
                        unit: "sqft",
                      },
                      status: "IN_PROGRESS",
                      isCompleted: true,
                      remarks: "75% complete",
                      startedDate: "2024-12-30T08:00:00Z",
                      assignedTo: "Tile Team A",
                    },
                    {
                      id: "li_004",
                      name: "Electrical Fixtures",
                      category: "electrical",
                      plannedQuantity: {
                        value: 5,
                        unit: "points",
                      },
                      status: "PENDING",
                      isCompleted: false,
                      remarks: "",
                      estimatedStartDate: "2025-01-08T09:00:00Z",
                      assignedTo: "Electrical Team C",
                    },
                  ],
                },
              ],
            },
            {
              id: "flat102",
              name: "Flat 102",
              progress: 0,
              isCompleted: false,
              areas: [
                {
                  id: "kitchen102",
                  name: "Kitchen",
                  progress: 0,
                  isCompleted: false,
                  lineItems: [
                    {
                      id: "li_005",
                      name: "Cabinet Installation",
                      category: "cabinet",
                      plannedQuantity: {
                        value: 8,
                        unit: "units",
                      },
                      status: "PENDING",
                      isCompleted: false,
                      remarks: "",
                      estimatedStartDate: "2025-01-10T09:00:00Z",
                      assignedTo: "Carpentry Team A",
                    },
                    {
                      id: "li_006",
                      name: "Countertop Installation",
                      category: "countertop",
                      plannedQuantity: {
                        value: 12,
                        unit: "sqft",
                      },
                      status: "PENDING",
                      isCompleted: false,
                      remarks: "",
                      estimatedStartDate: "2025-01-15T09:00:00Z",
                      assignedTo: "Stone Team B",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "floor2",
          name: "Floor 2",
          progress: 0,
          isCompleted: false,
          flats: [
            {
              id: "flat201",
              name: "Flat 201",
              progress: 0,
              isCompleted: false,
              areas: [
                {
                  id: "livingroom201",
                  name: "Living Room",
                  progress: 0,
                  isCompleted: false,
                  lineItems: [
                    {
                      id: "li_007",
                      name: "Painting Work",
                      category: "painting",
                      plannedQuantity: {
                        value: 400,
                        unit: "sqft",
                      },
                      status: "PENDING",
                      isCompleted: false,
                      remarks: "",
                      estimatedStartDate: "2025-01-20T09:00:00Z",
                      assignedTo: "Painting Team A",
                    },
                    {
                      id: "li_008",
                      name: "Flooring Work",
                      category: "flooring",
                      plannedQuantity: {
                        value: 200,
                        unit: "sqft",
                      },
                      status: "PENDING",
                      isCompleted: false,
                      remarks: "",
                      estimatedStartDate: "2025-01-25T09:00:00Z",
                      assignedTo: "Flooring Team B",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    otherWithQuantity: {
      name: "Other Areas (with Quantity)",
      description:
        "Common areas and other sections with measurable quantities.",
      floors: [
        {
          id: "floor_lobby",
          name: "Lobby & Common Areas",
          progress: 0,
          isCompleted: false,
          flats: [
            {
              id: "flat_lobby",
              name: "Ground Floor Lobby",
              progress: 0,
              isCompleted: false,
              areas: [
                {
                  id: "area_main_entrance",
                  name: "Main Entrance",
                  progress: 0,
                  isCompleted: false,
                  lineItems: [
                    {
                      id: "li_lobby_001",
                      name: "Marble Flooring",
                      category: "flooring",
                      plannedQuantity: { value: 500, unit: "sqft" },
                      status: "PENDING",
                      isCompleted: false,
                      remarks: "Awaiting material delivery",
                      assignedTo: "Flooring Team C",
                    },
                    {
                      id: "li_lobby_002",
                      name: "Reception Desk Assembly",
                      category: "carpentry",
                      plannedQuantity: { value: 1, unit: "unit" },
                      status: "PENDING",
                      isCompleted: false,
                      remarks: "",
                      assignedTo: "Carpentry Team B",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    otherWithoutQuantity: {
      name: "Other Areas (without Quantity)",
      description: "General site work and miscellaneous tasks.",
      floors: [
        {
          id: "floor_external",
          name: "External & Site Works",
          progress: 0,
          isCompleted: false,
          flats: [
            {
              id: "flat_site",
              name: "Site Development",
              progress: 0,
              isCompleted: false,
              areas: [
                {
                  id: "area_landscaping",
                  name: "Landscaping & Cleanup",
                  progress: 0,
                  isCompleted: false,
                  lineItems: [
                    {
                      id: "li_ext_001",
                      name: "General Site Cleanup",
                      category: "misc",
                      status: "PENDING",
                      isCompleted: false,
                      remarks: "To be done post-monsoon",
                      assignedTo: "General Labour",
                    },
                    {
                      id: "li_ext_002",
                      name: "External Perimeter Fencing",
                      category: "civil",
                      status: "IN_PROGRESS",
                      isCompleted: false,
                      remarks: "Poles erected, wiring pending.",
                      assignedTo: "Civil Team D",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

function transformLineItem(rawItem: any): LineItem {
  return {
    id: rawItem.id,
    name: rawItem.name,
    quantity: rawItem.plannedQuantity?.value,
    unit: rawItem.plannedQuantity?.unit,
    status: rawItem.status,
    isCompleted: rawItem.isCompleted,
    remarks: rawItem.remarks,
  };
}

function transformArea(rawArea: any): Area {
  return {
    id: rawArea.id,
    name: rawArea.name,
    children: rawArea.lineItems.map(transformLineItem),
  };
}

function transformFlat(rawFlat: any): Flat {
  return {
    id: rawFlat.id,
    name: rawFlat.name,
    children: rawFlat.areas.map(transformArea),
  };
}

function transformFloor(rawFloor: any): Floor {
  return {
    id: rawFloor.id,
    name: rawFloor.name,
    children: rawFloor.flats.map(transformFlat),
  };
}

export const typicalAreasData: Floor[] =
  rawData.areas.typical.floors.map(transformFloor);

export const otherAreasWithQuantityData: Floor[] = (
  rawData.areas as any
).otherWithQuantity.floors.map(transformFloor);

export const otherAreasWithoutQuantityData: Floor[] = (
  rawData.areas as any
).otherWithoutQuantity.floors.map(transformFloor);
