import { isContextObject } from './Extension';

describe('Extension', () => {
  describe('isContextObject', () => {
    it('should return true when passed a valid context object', () => {
      const context = {
        params: {
          installation: {},
          instance: {},
        },
      };
      expect(isContextObject(context)).toBe(true);
    });
    it('should return true when context object has undefined instance param', () => {
      const context = {
        params: {
          installation: {},
          instance: undefined,
        },
      };
      expect(isContextObject(context)).toBe(true);
    });
    it('should return false when context object has undefined installation param', () => {
      const context = {
        params: {
          installation: undefined,
          instance: {},
        },
      };
      expect(isContextObject(context)).toBe(false);
    });
    it('should return false when context object is missing all params', () => {
      const context = {};
      expect(isContextObject(context)).toBe(false);
    });

    it('should return false when context object has empty params', () => {
      const context = { params: {} };
      expect(isContextObject(context)).toBe(false);
    });
  });
});
