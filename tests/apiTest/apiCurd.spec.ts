import test from "@playwright/test";
import { expect } from "../fixtures/fixtures";
import { updatedTodo } from "../helpers/arrayFunction";
import { dateValidation } from "../helpers/date";

type Schema = {
  [key: string]: string;
};

const expectedTypes: Schema = {
  id: "number",
  todo: "string",
  completed: "boolean",
  userId: "number"
};

const deleteResponseType: Schema = {
  id: "number",
  todo: "string",
  completed: "boolean",
  userId: "number",
  isDeleted: "boolean",
  deletedOn: "string"
};
const propertiesToCheck = ["id", "todo", "completed", "userId"];

test.describe("todo curd", async () => {
  test.use({ baseURL: "https://dummyjson.com" });

  test.only("get all todo should give all todos", async ({ request }) => {
    const response = await request.get("/todos");
    expect(response.status()).toBe(200);
    expect.soft(response.statusText()).not.toBe("Error");
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBeGreaterThanOrEqual(200);
    const res = await response.json();
    console.log("todos", res);
    expect(res.todos).toCheckArrayResponse(propertiesToCheck);
  });

  test("add todo", async ({ request }) => {
    const response = await request.post("todos/add", {
      data: {
        todo: "Use DummyJSON in the project",
        completed: false,
        userId: 5
      }
    });
    await expect.soft(response.statusText()).not.toBe("Error");
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBeGreaterThanOrEqual(200);
    const res = await response.json();
    expect(res).toHaveProperty("id");
    console.log("todos", res);
    expect(res).toCheckObjResponse(expectedTypes);
  });

  test.only("update todo", async ({ request }) => {
    const response = await request.put("todos/1", {
      data: {
        completed: true
      }
    });
    expect.soft(response.statusText()).not.toBe("Error");
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBeGreaterThanOrEqual(200);
    const res = await response.json();
    expect(res).toHaveProperty("id");
    expect(res).toEqual(updatedTodo);
    expect(res.completed).toBe(true);
    console.log("todos", res);
    expect(res).toCheckObjResponse(expectedTypes);
  });

  test("delete todo", async ({ request }) => {
    const response = await request.delete("todos/1");
    expect.soft(response.statusText()).not.toBe("Error");
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBeGreaterThanOrEqual(200);
    const res = await response.json();
    expect(res).toHaveProperty("isDeleted");
    expect(res.isDeleted).toBe(true);
    const date = dateValidation(res.deletedOn);
    expect(date).toBeTruthy();
    console.log("todos", res);
    expect(res).toCheckObjResponse(deleteResponseType);
  });
});
