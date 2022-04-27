/// <reference types="cypress" />

const distributedSignalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const distributedSignalBase = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const distributedSignalDistance = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const distributedSignalSize = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const distributedProbability = ':nth-child(5) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const distributedTransmissionFrequency = ':nth-child(6) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const signalRepresentation = '.css-1kav7zp-MuiPaper-root > .MuiPaper-root';
const activeSignalsList = '.css-ne2ks3-MuiGrid-root > .MuiTypography-root';

it("Create Spiked Signal and verify that one signal with name 'spikedsignal' has been created", () => {
    cy.visit("/")
    cy.get("button").contains("SPIKED SIGNAL").click()

    cy.get(distributedSignalName)
    .type("spikedsignal")
    .should("have.value", "spikedsignal")

    cy.get(distributedSignalBase)
    .type(2)
    .should('have.value', 2)

    cy.get(distributedSignalDistance)
    .type(4)
    .should('have.value', 4)

    cy.get(distributedSignalSize)
    .type(6)
    .should('have.value', 6)

    cy.get(distributedProbability)
    .type(8)
    .should('have.value', 8)

    cy.get(distributedTransmissionFrequency)
    .type(10)
    .should('have.value', 10)

    cy.get("[data-testid='ArrowDropDownIcon']").click()
    cy.contains("#mui-2-option-2", 'Websocket').click()
    cy.contains("button", "CREATE").click()
    cy.contains("button", "CREATE").click()
    
    cy.get(signalRepresentation).should("contain", "spikedsignal")
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