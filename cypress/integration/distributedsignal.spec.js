/// <reference types="cypress" />

const distributedSignalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const distributedSignalValue = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const distributedSignalDeviation = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const distributedSignalTransmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const signalRepresentation = '.css-1kav7zp-MuiPaper-root > .MuiPaper-root';
const activeSignalsList = '.css-ne2ks3-MuiGrid-root > .MuiTypography-root';


it("Create Normally Distributed Signal and verify that one signal with name 'normalsignal' has been created", () => {
    cy.visit("/")
    cy.get("button").contains("NORM. DIST. SIGNAL").click()

    cy.get(distributedSignalName)
    .type("normalsignal")
    .should("have.value", "normalsignal")

    cy.get(distributedSignalValue)
    .type(2)
    .should('have.value', 2)

    cy.get(distributedSignalDeviation)
    .type(4)
    .should('have.value', 4)

    cy.get(distributedSignalTransmissionFrequency)
    .type(6)
    .should('have.value', 6)

    cy.get("[data-testid='ArrowDropDownIcon']").click()
    cy.contains("#mui-2-option-2", 'Websocket').click()

    cy.contains("button", "CREATE").click()
    cy.contains("button", "CREATE").click()
    
    cy.get(signalRepresentation).should("contain", "normalsignal")
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
