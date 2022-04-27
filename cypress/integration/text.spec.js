/// <reference types="cypress" />


const sinusSignalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const cosinusSignalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const sinusSignalFrequency = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const cosinusSignalFrequency = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const sinusSignalAmplitude = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const cosinusSignalAmplitude = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const sinusSignalTransmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const cosinusSignalTransmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const sinusSignalRepresentation = '.css-1kav7zp-MuiPaper-root > .MuiPaper-root';
const activeSignalsList = '.css-ne2ks3-MuiGrid-root > .MuiTypography-root';

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
    cy.get(sinusSignalName)
    .type("name1")
    .should("have.value", "name1")

    cy.get(sinusSignalFrequency)
    .type(10)
    .should("have.value", 10)

    cy.get(sinusSignalAmplitude)
    .type(11)
    .should("have.value", 11)

    cy.get(sinusSignalTransmissionFrequency)
    .type(12)
    .should("have.value", 12)

    cy.get("[data-testid='ArrowDropDownIcon']").click()
    cy.contains("#mui-2-option-2", 'Websocket').click()

    cy.get("button").contains("COSINUS SIGNAL").click()
    
    cy.get(cosinusSignalName)
    .should("not.have.value", "name1")

    cy.get(cosinusSignalFrequency)
    .should("not.have.value", 10)

    cy.get(cosinusSignalAmplitude)
    .should("not.have.value", 11)

    cy.get(cosinusSignalTransmissionFrequency)
    .should("not.have.value", 12)
})

