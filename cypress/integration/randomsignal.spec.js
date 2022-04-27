/// <reference types="cypress" />

const randomSignalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const randomSignalLowerBoundary = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const randomSignalUpperBoundary = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const randomSignalTransmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const signalRepresentation = '.css-1kav7zp-MuiPaper-root > .MuiPaper-root';
const activeSignalsList = '.css-ne2ks3-MuiGrid-root > .MuiTypography-root';

it("Create Random Signal and verify that one signal with name 'rand' has been created", () => {
    cy.visit("/")

    cy.get(randomSignalName)
    .type("randomsig")
    .should('have.value', "randomsig")

    cy.get(randomSignalLowerBoundary)
    .type(2)
    .should('have.value', 2)

    cy.get(randomSignalUpperBoundary)
    .type(4)
    .should('have.value', 4)

    cy.get(randomSignalTransmissionFrequency)
    .type(6)
    .should('have.value', 6)

    cy.get("[data-testid='ArrowDropDownIcon']").click()
    cy.contains("#mui-1-option-2", 'Websocket').click()

    cy.contains("button", "CREATE").click()
    cy.contains("button", "CREATE").click()
    
    cy.get(signalRepresentation).should("contain", "randomsig")
    cy.get(activeSignalsList).should("contain", "0 / 1")
    cy.get('[data-testid="PlayArrowRoundedIcon"]').click()
    
    cy.wait(2000)

    cy.get(signalRepresentation).should("contain", "running..")
    cy.get('[data-testid="StopCircleRoundedIcon"]').click()
    cy.get('[data-testid="StopCircleRoundedIcon"]').click()
    
    cy.get(signalRepresentation).should("not.contain", "running..")
    cy.get(signalRepresentation).should("contain", "stopped")

    cy.get('[data-testid="DeleteForeverIcon"]').click()
    cy.get(activeSignalsList).should("not.contain", "0 / 1")
})