const { expect } = require("chai");
// Mock fetch to avoid network requests during unit tests
global.fetch = async () => ({
  ok: true,
  json: async () => [{ id: 1, title: "test post" }],
});

const getPosts = require("./app");

describe("Fetch API Test", function () {

  it("should return an array", async function () {
    const data = await getPosts();

    expect(data).to.be.an("array");
  });

  it("should return data with length greater than 0", async function () {
    const data = await getPosts();

    expect(data.length).to.be.greaterThan(0);
  });

  it("should contain objects", async function () {
    const data = await getPosts();

    expect(data[0]).to.be.an("object");
  });

});