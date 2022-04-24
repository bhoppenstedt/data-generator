/// <reference types="cypress" />

it("Create two different signals with two different publishers and verify by finding", () => {
    cy.visit("/")

    cy.get("#name").type("signal1").should('have.value', "signal1")
    cy.get("#lowerBoundary").type(3).should('have.value', 3)
    cy.get("#upperBoundary").type(5).should('have.value', 5)
    cy.get("#transmissionFrequency").type(7).should('have.value', 7)
    cy.get("[data-testid='ArrowDropDownIcon']").click()
    cy.contains("#mui-1-option-0", 'mqtt').should("be.visible").click()
    cy.contains("button", "CREATE").click()

    // cy.get("button").contains("SINUS SIGNAL").click()
    // cy.get('#outlined-basic').type("sin").should('have.value', "sin")
    // cy.get(':nth-child(4) > .MuiOutlinedInput-root > #formatted-numberformat-input').type(2)
    // .should('have.value', 2)
    // cy.get(':nth-child(6) > .MuiOutlinedInput-root > #formatted-numberformat-input').type(4)
    // .should('have.value', 4)
    // cy.get(':nth-child(8) > .MuiOutlinedInput-root > #formatted-numberformat-input').type(6)
    // .should('have.value', 6)
    // cy.get("[data-testid='ArrowDropDownIcon']").click()
    // cy.contains("#mui-2-option-1", 'kafka').should("be.visible").click()
    // cy.contains("button", "CREATE").click()

    cy.get("button").contains("COSINUS SIGNAL").click()
    cy.get('#outlined-basic').type("signal2").should('have.value', "signal2")
    cy.get(':nth-child(4) > .MuiOutlinedInput-root > #formatted-numberformat-input').type(3)
    .should('have.value', 3)
    cy.get(':nth-child(6) > .MuiOutlinedInput-root > #formatted-numberformat-input').type(5)
    .should('have.value', 5)
    cy.get(':nth-child(8) > .MuiOutlinedInput-root > #formatted-numberformat-input').type(7)
    .should('have.value', 7)
    cy.get("[data-testid='ArrowDropDownIcon']").click()
    cy.contains("#mui-2-option-2",'websocket').should("be.visible").click()
    cy.contains("button", "CREATE").click()

    cy.get('.css-c729t7-MuiGrid-root').should("contain", "MQTT").and("contain", "WEBSOCKET")

    cy.get('.MuiGrid-grid-xs-12 > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input').type("signal1")
    cy.get('.css-c729t7-MuiGrid-root').should("contain", "MQTT").and("not.contain", "WEBSOCKET")
    cy.get('.MuiGrid-grid-xs-12 > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input').clear()
    cy.get('.MuiGrid-grid-xs-12 > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input').type("signal2")
    cy.get('.css-c729t7-MuiGrid-root').should("contain", "WEBSOCKET").and("not.contain", "MQTT")

    cy.get('[data-testid="DeleteForeverIcon"]').click()
    cy.get('.MuiGrid-grid-xs-12 > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input').clear()
    cy.get('[data-testid="DeleteForeverIcon"]').click()
})