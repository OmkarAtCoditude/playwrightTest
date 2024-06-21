export {};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeObjectCheckType(): R;
      toCheckArrayResponse([]): R;
      toCheckObjResponse(obj: object): R;
    }
  }
}
