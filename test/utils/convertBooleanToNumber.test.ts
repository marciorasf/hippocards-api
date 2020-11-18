import convertBooleanToNumber from "../../src/utils/convertBooleanToNumber";

test("convert true to 1", () => {
  expect(convertBooleanToNumber(true)).toBe(1);
});

test("convert false to 0", () => {
  expect(convertBooleanToNumber(false)).toBe(0);
});
