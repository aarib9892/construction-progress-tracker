import type { Floor } from "@/types/tracking-types";

export const typicalAreasData: Floor[] = [
  {
    id: "floor-1",
    name: "Floor 1",
    children: [
      {
        id: "flat-101",
        name: "Flat 101",
        children: [
          {
            id: "area-101-living",
            name: "Living Room",
            children: [
              { id: "item-1", name: "Internal Plaster" },
              { id: "item-2", name: "Internal Painting" },
              { id: "item-3", name: "Tiling" },
              { id: "item-4", name: "Electrical Work" },
            ],
          },
          {
            id: "area-101-kitchen",
            name: "Kitchen",
            children: [
              { id: "item-5", name: "Tiling" },
              { id: "item-6", name: "Plumbing" },
              { id: "item-7", name: "Cabinet Installation" },
            ],
          },
        ],
      },
      {
        id: "flat-102",
        name: "Flat 102",
        children: [
          {
            id: "area-102-living",
            name: "Living Room",
            children: [
              { id: "item-8", name: "Internal Plaster" },
              { id: "item-9", name: "Internal Painting" },
              { id: "item-10", name: "Tiling" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "floor-2",
    name: "Floor 2",
    children: [
      {
        id: "flat-201",
        name: "Flat 201",
        children: [
          {
            id: "area-201-bedroom",
            name: "Bedroom",
            children: [
              { id: "item-11", name: "Internal Plaster" },
              { id: "item-12", name: "Internal Painting" },
              { id: "item-13", name: "Wooden Flooring" },
            ],
          },
        ],
      },
    ],
  },
];

export const otherAreasWithQuantityData: Floor[] = [
  {
    id: "oaq-floor-1",
    name: "Common Areas",
    children: [
      {
        id: "oaq-flat-1",
        name: "Lobby",
        children: [
          {
            id: "oaq-area-1",
            name: "Main Lobby",
            children: [
              { id: "oaq-item-1", name: "Marble Flooring", quantity: 200 },
              { id: "oaq-item-2", name: "Lighting Fixtures", quantity: 15 },
            ],
          },
        ],
      },
    ],
  },
];

export const otherAreasWithoutQuantityData: Floor[] = [
  {
    id: "oawq-floor-1",
    name: "External Work",
    children: [
      {
        id: "oawq-flat-1",
        name: "Facade",
        children: [
          {
            id: "oawq-area-1",
            name: "West Wing",
            children: [
              { id: "oawq-item-1", name: "External Plaster" },
              { id: "oawq-item-2", name: "External Painting" },
            ],
          },
        ],
      },
    ],
  },
];
