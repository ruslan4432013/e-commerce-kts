import { CollectionModel } from "shared/lib";

export const initialCollection: CollectionModel<string, string> = {
  order: [],
  entities: {},
};

export const normalizeCollectionMock1 = [
  { id: "1", name: "Petya" },
  { id: "2", name: "Vasya" },
  { id: "3", name: "Anya" },
  { id: "4", name: "Nikita" },
  { id: "5", name: "Sergey" },
  { id: "6", name: "Ivan" },
];

export const normalizeCollectionExpected1: CollectionModel<any, any> = {
  order: ["1", "2", "3", "4", "5", "6"],
  entities: {
    "1": { id: "1", name: "Petya" },
    "2": { id: "2", name: "Vasya" },
    "3": { id: "3", name: "Anya" },
    "4": { id: "4", name: "Nikita" },
    "5": { id: "5", name: "Sergey" },
    "6": { id: "6", name: "Ivan" },
  },
};
