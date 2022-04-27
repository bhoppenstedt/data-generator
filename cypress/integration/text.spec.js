/// <reference types="cypress" />

beforeEach(() => {
    cy.visit("/")
  })

it("Verify that text exists on the website", () => {
    cy.contains("datastream generator").should("be.visible")
    cy.contains("signal type").should("be.visible")
    cy.contains("signal configuration").should("be.visible")
    cy.contains("datastreams").should("be.visible")
    cy.contains("start all").should("be.visible")
    cy.contains("stop all").should("be.visible")
    cy.contains("search datastreams").should("be.visible")
    cy.contains("No streams created yet.").should("be.visible")
})

it("Verify that inputfield text gets doesn't get transferred to other signals", () => {
    cy.get("button").contains("SINUS SIGNAL").click()
    cy.get('#outlined-basic').type("name1").should("have.value", "name1")
    cy.get(':nth-child(4) > .MuiOutlinedInput-root > #formatted-numberformat-input')
    .type(10)
    .should("have.value", 10)
    cy.get(':nth-child(6) > .MuiOutlinedInput-root > #formatted-numberformat-input')
    .type(11)
    .should("have.value", 11)
    cy.get(':nth-child(8) > .MuiOutlinedInput-root > #formatted-numberformat-input')
    .type(12)
    .should("have.value", 12)
    cy.get("[data-testid='ArrowDropDownIcon']").click()
    cy.contains("#mui-2-option-2", 'websocket').click()
    cy.get("button").contains("COSINUS SIGNAL").click()
    cy.get('#outlined-basic').should("not.have.value", "name1")
    cy.get(':nth-child(4) > .MuiOutlinedInput-root > #formatted-numberformat-input')
    .should("not.have.value", 10)
    cy.get(':nth-child(6) > .MuiOutlinedInput-root > #formatted-numberformat-input')
    .should("not.have.value", 11)
    cy.get(':nth-child(8) > .MuiOutlinedInput-root > #formatted-numberformat-input')
    .should("not.have.value", 12)
})

