import { mergeExpects } from "@playwright/test";
import { expect as toBeObjectType } from "./toBeObjectType";
import { expect as toCheckArrayResponse } from "./toCheckArrayResponse";
import { expect as toCheckObjResponse } from "./toCheckObjResponse";

export { test } from "@playwright/test";

export const expect = mergeExpects(
  toBeObjectType,
  toCheckArrayResponse,
  toCheckObjResponse
);
