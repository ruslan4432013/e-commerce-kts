export const filterUniqueByKeyMock1 = [
  { id: 1, city: "Piter" },
  { id: 2, city: "Moscow" },
  { id: 3, city: "Silver" },
  { id: 4, city: "Silver" },
  { id: 5, city: "Piter" },
];

export const filterUniqueByKeyExpected1 = [
  { id: 1, city: "Piter" },
  { id: 2, city: "Moscow" },
  { id: 3, city: "Silver" },
];
