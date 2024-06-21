import { expect as baseExcept } from "@playwright/test";

type Schema = {
  [key: string]: string;
};

export const expect = baseExcept.extend({
  toCheckObjResponse(received: any, expectedTypes: Schema) {
    const mismatchedKeys: string[] = [];

    for (const key in expectedTypes) {
      if (expectedTypes.hasOwnProperty(key)) {
        const expectedType = expectedTypes[key];
        console.log("hey expectedType", expectedType);

        const actualType = typeof received[key];
        console.log("hey actualType", actualType);

        if (actualType !== expectedType) {
          mismatchedKeys.push(key);
          console.log("hey ", mismatchedKeys);
        }
      }
    }
    if (!mismatchedKeys.length) {
      return {
        message: () => "passed",
        pass: true
      };
    } else {
      return {
        message: () =>
          `toCheckResponse() assertion failed.\n Following keys don't have  expected types ${mismatchedKeys}\n`,
        pass: false
      };
    }
  }
});
