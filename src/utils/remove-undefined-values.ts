import { pickBy } from "lodash";

export default function removeUndefinedValues(originalObject: any) {
  return pickBy(originalObject, (value) => value !== undefined);
}
