import { expect as baseExcept } from "@playwright/test";

// const propertiesToCheck = ["id", "todo", "completed", "userId"];

const findObjectsMissingProperties = (array: any, properties: string[]) => {
  return array.filter(obj =>
    properties.some(prop => !obj.hasOwnProperty(prop))
  );
};

export const expect = baseExcept.extend({
  toCheckArrayResponse(received: any, propertiesToCheck: string[]) {
    let objectMissingProperty: object[] = [];
    if (Array.isArray(received)) {
      objectMissingProperty = findObjectsMissingProperties(
        received,
        propertiesToCheck
      );
    }
    if (!objectMissingProperty.length) {
      return {
        message: () => "passed",
        pass: true
      };
    } else {
      return {
        message: () =>
          `toCheckArrayResponse() assertion failed.\n Following object not have given properties ${typeof received}\n`,
        pass: false
      };
    }
  }
});
