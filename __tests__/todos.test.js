process.env.NODE_ENV = "test";
// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../server");
// import model to delete data after test
const Todo = require("../models/todo.model");

afterAll(async () => {
  //delete testing database
  Todo.collection.drop();
});

describe("POST /addNewTodo/", () => {
  test("It should save todo", async (done) => {
    const response = await request(app)
      .post("/addNewTodo/")
      .send({
        task: "a new task",
        completed: false
      });

    expect(response.body).toHaveProperty("task");
    expect(response.body.task).toBe("a new task");

    expect(response.body).toHaveProperty("completed");
    expect(response.body.completed).toBe(false);

    expect(response.statusCode).toBe(200);
    done();
  });
});

describe("GET /", () => {
  test("It should return a list of todo", async (done) => {
    const response = await request(app)
      .get("/")

    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("task");
    expect(response.body[0].task).toBe("a new task");

    expect(response.body[0]).toHaveProperty("completed");
    expect(response.body[0].completed).toBe(false);

    expect(response.statusCode).toBe(200);
    done();
  });
});

describe("GET /", () => {
  test("It should return a list of todo", async (done) => {
    const response = await request(app)
      .get("/")

    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("task");
    expect(response.body[0].task).toBe("a new task");

    expect(response.body[0]).toHaveProperty("completed");
    expect(response.body[0].completed).toBe(false);

    expect(response.statusCode).toBe(200);
    done();
  });
});

describe("POST /:id/update", () => {
  test("It should update a given todo", async (done) => {
    const getResponse = await request(app).get("/")
    const todo = getResponse.body[0]

    const response = await request(app)
      .post(`/${todo._id}/update`)
      .send({
        task: "edited todo",
        completed: true
      })

    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(todo._id)
    expect(response.body.task).toBe("edited todo")
    expect(response.body.completed).toBe(true)
    done();
  });
});

describe("DELETE /:id/delete", () => {
  test("It should update a given todo", async (done) => {
    const getResponse = await request(app).get("/")
    const todo = getResponse.body[0]

    const response = await request(app).delete(`/${todo._id}/delete`)

    expect(response.statusCode).toBe(200);
    done();
  });
});
