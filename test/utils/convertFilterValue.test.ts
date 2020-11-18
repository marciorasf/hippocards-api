import convertFilterValue from "../../src/utils/convertFilterValue"

test("convert string true to boolean true", ()=>{
  expect(convertFilterValue("true")).toBe(true)
})

test("convert string false to boolean false", ()=>{
  expect(convertFilterValue("false")).toBe(false)
})

test("convert empty string to undefined", ()=>{
  expect(convertFilterValue("")).toBe(undefined)
})

test("convert not true or false string to undefined", ()=>{
  expect(convertFilterValue("testing")).toBe(undefined)
})
