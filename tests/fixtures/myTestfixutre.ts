import { test as base } from "@playwright/test";
import APIClient from "../utils/api-client";

type MyFixtures = {
  commonApiFixture: APIClient;
  authApiFixture: APIClient;
};

const authApiUrl = "https://dummyjson.com/auth/";
const baseApiUrl = "https://dummyjson.com/";

const fixtures = base.extend<MyFixtures>({
  authApiFixture: async ({ request }, use) => {
    const API = new APIClient(request, authApiUrl);
    await use(API);
  },
  commonApiFixture: async ({ request }, use) => {
    const API = new APIClient(request, baseApiUrl);
    await use(API);
  }
});

export { fixtures };
