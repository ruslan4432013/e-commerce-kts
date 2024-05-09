import {
  filterUniqueByKeyExpected1,
  filterUniqueByKeyMock1,
} from "./filter-unique-by-key.mock";
import { filterUniqueByKey } from "../../filter-unique-by-key";

describe("filter-unique-by-key", () => {
  it("should return array with unique cities", () => {
    const result = filterUniqueByKey(filterUniqueByKeyMock1, "city");
    expect(result).toEqual(filterUniqueByKeyExpected1);
  });

  it("no duplicates in result", () => {
    const result = filterUniqueByKey(filterUniqueByKeyMock1, "city");
    const citiesResult = result.map((d) => d.city);
    const citiesUnique = new Set(filterUniqueByKeyMock1.map((d) => d.city));
    expect(citiesResult).toHaveLength(citiesUnique.size);
  });

  it("should return empty array", () => {
    const result = filterUniqueByKey([], "city");
    expect(result).toEqual([]);
  });
});
