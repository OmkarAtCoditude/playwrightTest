import { expect as baseExcept } from "@playwright/test";
export const expect = baseExcept.extend({
  toBeObjectType(received: any) {
    const pass = typeof received === "object";
    if (pass) {
      return {
        message: () => "passed",
        pass: true
      };
    } else {
      return {
        message: () =>
          `toBeObject() assertion failed.\nYou expected '${received}' to be an object but it's a ${typeof received}\n`,
        pass: false
      };
    }
  }
});
