/// <reference types="cypress" />

const randomSignalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const randomSignalLowerBoundary = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const randomSignalUpperBoundary = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const randomSignalTransmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const signalRepresentation = '.css-1kav7zp-MuiPaper-root > .MuiPaper-root';
const activeSignalsList = '.css-ne2ks3-MuiGrid-root > .MuiTypography-root';
const listOfCreatedSignals = '.css-c729t7-MuiGrid-root'

it("Create a signal named 'rand' and verify that it still exists after refreshing website", () => {
    cy.visit("/")
    cy.get(randomSignalName).type("rand").should('have.value', "rand")
    cy.get(randomSignalLowerBoundary).type(4).should('have.value', 4)
    cy.get(randomSignalUpperBoundary).type(6).should('have.value', 6)
    cy.get(randomSignalTransmissionFrequency).type(8).should('have.value', 8)
    cy.get("[data-testid='ArrowDropDownIcon']").click()
    cy.contains("#mui-1-option-2", 'Websocket').click()
    cy.contains("button", "CREATE").click()
    cy.contains("button", "CREATE").click()
    
    cy.get(signalRepresentation).should("contain", "rand")

    cy.visit("/")

    cy.get(activeSignalsList).should("contain", "0 / 0")
    cy.get(listOfCreatedSignals).should("not.contain", "rand")
    .and("not.contain", "random")
    .and("not.contain", "WEBSOCKET")

    cy.get('[data-testid="CachedIcon"]').click()
    cy.get(signalRepresentation).should("contain", "rand")
    cy.get(activeSignalsList).should("contain", "0 / 1")

    cy.get('[data-testid="DeleteForeverIcon"]').click()
    cy.get(activeSignalsList).should("not.contain", "0 / 1")
})