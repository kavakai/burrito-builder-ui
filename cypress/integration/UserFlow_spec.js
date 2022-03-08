import { testData } from "./testData";

describe("Home page", () => {
  
  beforeEach(() => {
    cy.intercept("http://localhost:3001/api/v1/orders", testData).as("testData")
    cy.visit("http://localhost:3000/")
  })

  it("Should display a title and a new burrito form", () => {
    cy.get("h1")
      .contains("Burrito Builder")
      .get("form")
      .get("button")
      .should("have.length", 13)
  })
})