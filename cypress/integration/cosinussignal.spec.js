/// <reference types="cypress" />

const cosinusSignalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const cosinusSignalFrequency = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const cosinusSignalAmplitude = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const cosinusSignalTransmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const signalRepresentation = '.css-1kav7zp-MuiPaper-root > .MuiPaper-root';
const activeSignalsList = '.css-ne2ks3-MuiGrid-root > .MuiTypography-root';

it("Create Cosinus Signal and verify that one signal with name 'cosinussignal' has been created", () => {
    cy.visit("/")
    cy.get("button").contains("COSINUS SIGNAL").click()

    cy.get(cosinusSignalName)
    .type("cosinussignal")
    .should("have.value", "cosinussignal")

    cy.get(cosinusSignalFrequency)
    .type(2)
    .should('have.value', 2)

    cy.get(cosinusSignalAmplitude)
    .type(4)
    .should('have.value', 4)

    cy.get(cosinusSignalTransmissionFrequency)
    .type(6)
    .should('have.value', 6)

    cy.get("[data-testid='ArrowDropDownIcon']").click()
    cy.contains("#mui-2-option-2", 'Websocket').click()
    cy.contains("button", "CREATE").click()
    cy.contains("button", "CREATE").click()
    
    cy.get(signalRepresentation).should("contain", "cosinussignal")
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