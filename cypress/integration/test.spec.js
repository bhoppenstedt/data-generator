/// <reference types="cypress" />

const signalRepresentation = '.css-1kav7zp-MuiPaper-root > .MuiPaper-root';
const activeSignalsList = '.css-ne2ks3-MuiGrid-root > .MuiTypography-root';
const listOfStreams = '.css-1kav7zp-MuiPaper-root'

describe("Visit Data Generator Page and start all types of signals", () => {
    it("Create Random Signal", () => {

        const signalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const lowerBoundary = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const upperBoundary = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const transmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';

        cy.visit("/")

        cy.get(signalName)
        .type("rand")
        .should('have.value', "rand")

        cy.get(lowerBoundary)
        .type(2)
        .should('have.value', 2)

        cy.get(upperBoundary)
        .type(4)
        .should('have.value', 4)

        cy.get(transmissionFrequency)
        .type(6)
        .should('have.value', 6)

        cy.get("[data-testid='ArrowDropDownIcon']").click()
        cy.contains("#mui-1-option-2", 'Websocket').click()

        cy.contains("button", "CREATE").click()
        cy.contains("button", "CREATE").click()
        cy.get(signalRepresentation).should("contain", "rand")
    })

    it("Create Sinus Signal", () => {

        const signalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const frequency = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const amplitude = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const transmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';

        cy.visit("/")
        cy.get("button").contains("SINUS SIGNAL").click()

        cy.get(signalName)
        .type("sin")
        .should('have.value', "sin")

        cy.get(frequency)
        .type(2)
        .should('have.value', 2)

        cy.get(amplitude)
        .type(4)
        .should('have.value', 4)

        cy.get(transmissionFrequency)
        .type(6)
        .should('have.value', 6)

        cy.get("[data-testid='ArrowDropDownIcon']").click()
        cy.contains("#mui-2-option-2", 'Websocket').click()

        cy.contains("button", "CREATE").click()
        cy.contains("button", "CREATE").click()
        cy.get(signalRepresentation).should("contain", "sin")
    })

    it("Create Cosinus Signal", () => {

        const signalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const frequency = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const amplitude = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const transmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';

        cy.visit("/")
        cy.get("button").contains("COSINUS SIGNAL").click()

        cy.get(signalName)
        .type("cos")
        .should("have.value", "cos")

        cy.get(frequency)
        .type(2)
        .should('have.value', 2)

        cy.get(amplitude)
        .type(4)
        .should('have.value', 4)

        cy.get(transmissionFrequency)
        .type(6)
        .should('have.value', 6)

        cy.get("[data-testid='ArrowDropDownIcon']").click()
        cy.contains("#mui-2-option-2", 'Websocket').click()

        cy.contains("button", "CREATE").click()
        cy.contains("button", "CREATE").click()
        cy.get(signalRepresentation).should("contain", "cos")
    })

    it("Create Spiked Signal", () => {

        const signalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const base = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const distance = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const size = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const probability = ':nth-child(5) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const transmissionFrequency = ':nth-child(6) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';

        cy.visit("/")
        cy.get("button").contains("SPIKED SIGNAL").click()

        cy.get(signalName)
        .type("spi")
        .should("have.value", "spi")

        cy.get(base)
        .type(2)
        .should('have.value', 2)

        cy.get(distance)
        .type(4)
        .should('have.value', 4)

        cy.get(size)
        .type(6)
        .should('have.value', 6)

        cy.get(probability)
        .type(8)
        .should('have.value', 8)

        cy.get(transmissionFrequency)
        .type(10)
        .should('have.value', 10)

        cy.get("[data-testid='ArrowDropDownIcon']").click()
        cy.contains("#mui-2-option-2", 'Websocket').click()

        cy.contains("button", "CREATE").click()
        cy.contains("button", "CREATE").click()
       cy.get(signalRepresentation).should("contain", "spi")
    })

    it("Create Normally Distributed Signal", () => {

        const signalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const expectedValue = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const standardDeviation = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const transmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';

        cy.visit("/")
        cy.get("button").contains("NORM. DIST. SIGNAL").click()

        cy.get(signalName)
        .type("norm")
        .should("have.value", "norm")

        cy.get(expectedValue)
        .type(2)
        .should('have.value', 2)

        cy.get(standardDeviation)
        .type(4)
        .should('have.value', 4)

        cy.get(transmissionFrequency)
        .type(6)
        .should('have.value', 6)

        cy.get("[data-testid='ArrowDropDownIcon']").click()
        cy.contains("#mui-2-option-2", 'Websocket').click()
        
        cy.contains("button", "CREATE").click()
        cy.contains("button", "CREATE").click()
        cy.get('.css-1kav7zp-MuiPaper-root > .MuiPaper-root').should("contain", "norm")
    })

    it("Start all streams", () => {
        cy.wait(2000)
        cy.get('[data-testid="PlayCircleFilledWhiteRoundedIcon"]').click()
        cy.wait(2000)
        cy.get('[data-testid="PlayCircleFilledWhiteRoundedIcon"]').click()
        cy.wait(2000)
        cy.get(activeSignalsList).should("contain", "5 / 5")
    })
    
  })