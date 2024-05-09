import {
  initialCollection,
  normalizeCollectionExpected1,
  normalizeCollectionMock1,
} from "./collection.mock";
import {
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "../../collection";

describe("collection", () => {
  describe("getInitialCollectionModel", () => {
    it("should return initial collection", () => {
      const result = getInitialCollectionModel();
      expect(result).toEqual(initialCollection);
    });
  });
  describe("normalizeCollection", () => {
    it("should return correct collection", () => {
      const result = normalizeCollection(
        normalizeCollectionMock1,
        (el) => el.id
      );
      expect(result).toEqual(normalizeCollectionExpected1);
    });
    it("should return empty collection", () => {
      const result = normalizeCollection([] as { id: string }[], (el) => el.id);
      expect(result).toEqual(initialCollection);
    });
  });
  describe("linearizeCollection", () => {
    it("should return correct collection", () => {
      const normalizedCollection = normalizeCollection(
        normalizeCollectionMock1,
        (el) => el.id
      );
      const result = linearizeCollection(normalizedCollection);
      expect(result).toEqual(normalizeCollectionMock1);
    });
  });
});
