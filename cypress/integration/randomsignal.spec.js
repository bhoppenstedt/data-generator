/// <reference types="cypress" />

it("Create Random Signal and verify that one signal with name 'rand' has been created", () => {
    cy.visit("/")
    cy.get("#name").type("randomsig").should('have.value', "randomsig")
    cy.get("#lowerBoundary").type(2).should('have.value', 2)
    cy.get("#upperBoundary").type(4).should('have.value', 4)
    cy.get("#transmissionFrequency").type(6).should('have.value', 6)
    cy.get("[data-testid='ArrowDropDownIcon']").click()
    cy.contains("#mui-1-option-2", 'websocket').click()
    cy.contains("button", "CREATE").click()
    
    cy.intercept('GET', 'http://localhost:5000/api/signals/')
    
    cy.get('.css-1kav7zp-MuiPaper-root > .MuiPaper-root').should("contain", "randomsig")
    cy.get('.css-ne2ks3-MuiGrid-root > .MuiTypography-root').should("contain", "0 / 1")
    cy.get('[data-testid="PlayArrowRoundedIcon"]').click()
    cy.wait(2000)
    cy.get('.css-g7hzhr-MuiStack-root > .MuiTypography-root').should("contain", "running..")
    cy.get('[data-testid="StopCircleRoundedIcon"]').click()
    cy.get('[data-testid="StopCircleRoundedIcon"]').click()
    
    cy.get('.css-g7hzhr-MuiStack-root > .MuiTypography-root').should("not.contain", "running..")
    cy.get('.css-g7hzhr-MuiStack-root > .MuiTypography-root').should("contain", "stopped")

    cy.get('[data-testid="DeleteForeverIcon"]').click()
    cy.get('.css-ne2ks3-MuiGrid-root > .MuiTypography-root').should("not.contain", "0 / 1")
})