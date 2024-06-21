import { expect } from "@playwright/test";
import { fixtures as test } from "../fixtures/myTestfixutre";

const baseUrl = "https://dummyjson.com";

const auth_endpoint = "/auth";
const user_credentials = {
  username: "emilys",
  password: "emilyspass"
};
let authToken: string;
const invalidToken: string = "";

test.describe("api testing", () => {
  test.beforeAll(async ({ authApiFixture }) => {
    const response = await authApiFixture.post("login", user_credentials);
    const data = await response.json();
    authToken = data.token;
    console.log("hey>>>>>>", authToken);
  });

  test("should not be able to access protected endpoint with invalid access token", async ({
    request,
    authApiFixture
  }) => {
    const response = await request.get(`${baseUrl}${auth_endpoint}`, {
      headers: {
        Authorization: `Bearer ${invalidToken}`
      }
    });

    expect(response.ok()).toBeFalsy();
  });

  test("should be able to access protected endpoint with valid access token", async ({
    request
  }) => {
    const response = await request.get(`${baseUrl}${auth_endpoint}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    expect(response.ok()).toBeTruthy();
  });

  test("should be able to access protected endpoint without token", async ({
    request
  }) => {
    const response = await request.get(`${baseUrl}${auth_endpoint}`);

    expect(response.ok()).toBeFalsy();
  });
});
