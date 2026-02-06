const request = require("supertest");
const express = require("express");
const documentRoutes = require("../routes/documents.routes");

const app = express();
app.use("/api/documents", documentRoutes);

describe("GET /api/documents", () => {
  it("should return 200 status", async () => {
    const res = await request(app).get("/api/documents");
    expect(res.statusCode).toBe(200);
  });
});
