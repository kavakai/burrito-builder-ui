import { orders } from "./testData";
import kai from "./samplePost"

describe("Home page", () => {
  
  beforeEach(() => {
    cy.intercept("http://localhost:3001/api/v1/orders", orders).as("testData")
    cy.visit("http://localhost:3000/")
  })

  it("Should display a title and a new burrito form", () => {
    cy.get("h1")
      .contains("Burrito Builder")
      .get("form")
      .get("button")
      .should("have.length", 13)
  })

  it("Should allow me to add a new order", () => {
    cy.intercept("http://localhost:3001/api/v1/orders", {
      method: "POST",
      body: JSON.stringify(kai),
      headers: {
        "Content-Type": "application/json"
      }
    })
    cy.get("input")
      .type("Kai")
      .get("button")
      .first()
      .click()
      .next()
      .click()
      .get("button")
      .last()
      .click()
  })
})