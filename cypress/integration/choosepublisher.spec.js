/// <reference types="cypress" />

const searchField = '.MuiGrid-grid-xs-12 > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
const listOfStreams = '.css-1kav7zp-MuiPaper-root'
const deleteButton = ':nth-child(1) > :nth-child(1) > .MuiGrid-grid-xs-2 > .css-g7hzhr-MuiStack-root > .css-j6p7hn-MuiStack-root > :nth-child(2) > .MuiIconButton-label > [data-testid="DeleteForeverIcon"] > path'

describe("Create two different signals with two different publishers and verify by finding", () => {

    it("Create a first example signal of type random, choosing 'MQTT' as publisher", () => {

        const signalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const lowerBoundary = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const upperBoundary = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const transmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';

        cy.visit("/")
    
        cy.get(signalName)
        .type("signal1")
        .should('have.value', "signal1")

        cy.get(lowerBoundary)
        .type(3)
        .should('have.value', 3)

        cy.get(upperBoundary)
        .type(5)
        .should('have.value', 5)

        cy.get(transmissionFrequency)
        .type(7)
        .should('have.value', 7)

        cy.get("[data-testid='ArrowDropDownIcon']").click()
        cy.contains("#mui-1-option-0", 'MQTT').should("be.visible").click()
        cy.contains("button", "CREATE").click()
        cy.wait(2000)
        cy.contains("button", "CREATE").click()
    })
    
    it("Create a second example signal of type sinus, choosing 'Kafka' as publisher", () => {

        const signalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const frequency = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const amplitude = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const transmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';

        cy.get("button").contains("SINUS SIGNAL").click()

        cy.get(signalName)
        .type("signal2")
        .should('have.value', "signal2")

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
        cy.contains("#mui-2-option-1", 'Kafka').should("be.visible").click()
        cy.contains("button", "CREATE").click()
        cy.contains("button", "CREATE").click()

    })
    
    it("Create a third example signal of type cosinus, choosing 'Websocket' as publisher", () => {

        const signalName = '.css-1a0kl2o-MuiStack-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const frequency = ':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const amplitude = '.css-1a0kl2o-MuiStack-root > :nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';
        const transmissionFrequency = ':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input';

        cy.visit("/")
        cy.get("button").contains("SINUS SIGNAL").click()

        cy.get(signalName)
        .type("signal3")
        .should('have.value', "signal3")

        cy.get(frequency)
        .type(3)
        .should('have.value', 3)

        cy.get(amplitude)
        .type(5)
        .should('have.value', 5)

        cy.get(transmissionFrequency)
        .type(7)
        .should('have.value', 7)

        cy.get("[data-testid='ArrowDropDownIcon']").click()
        cy.contains("#mui-2-option-2",'Websocket').should("be.visible").click()
        cy.contains("button", "CREATE").click()
        cy.contains("button", "CREATE").click()
    
        cy.get(listOfStreams).should("contain", "MQTT").and("contain", "KAFKA").and("contain", "WEBSOCKET")
    
        cy.get(searchField).type("signal1")
        cy.get(listOfStreams).should("contain", "MQTT").and("not.contain", "KAFKA").and("not.contain", "WEBSOCKET")
        cy.get(searchField).clear()
        cy.get(searchField).type("signal2")
        cy.get(listOfStreams).should("not.contain", "MQTT").and("contain", "KAFKA").and("not.contain", "WEBSOCKET")
        cy.get(searchField).clear()
        cy.get(searchField).type("signal3")
        cy.get(listOfStreams).should("not.contain", "MQTT").and("not.contain", "KAFKA").and("contain", "WEBSOCKET")
    
        cy.get(searchField).clear()
        cy.get(deleteButton).click()
        cy.get(deleteButton).click()
        cy.get(deleteButton).click()
    })
})

