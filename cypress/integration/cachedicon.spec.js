/// <reference types="cypress" />

it("Create a signal named 'rand' and verify that it still exists after refreshing website", () => {
    cy.visit("/")
    cy.get("#name").type("rand").should('have.value', "rand")
    cy.get("#lowerBoundary").type(4).should('have.value', 4)
    cy.get("#upperBoundary").type(6).should('have.value', 6)
    cy.get("#transmissionFrequency").type(8).should('have.value', 8)
    cy.get("[data-testid='ArrowDropDownIcon']").click()
    cy.contains("#mui-1-option-2", 'websocket').click()
    cy.contains("button", "CREATE").click()
    
    cy.get('.css-1kav7zp-MuiPaper-root > .MuiPaper-root').should("contain", "rand")

    cy.visit("/")

    cy.get('.css-ne2ks3-MuiGrid-root > .MuiTypography-root').should("contain", "0 / 0")
    cy.get('.css-c729t7-MuiGrid-root').should("not.contain", "rand")
    .and("not.contain", "random")
    .and("not.contain", "WEBSOCKET")

    cy.get('[data-testid="CachedIcon"]').click()
    cy.get('.css-1kav7zp-MuiPaper-root > .MuiPaper-root').should("contain", "rand")
    cy.get('.css-ne2ks3-MuiGrid-root > .MuiTypography-root').should("contain", "0 / 1")

    cy.get('[data-testid="DeleteForeverIcon"]').click()
    cy.get('.css-ne2ks3-MuiGrid-root > .MuiTypography-root').should("not.contain", "0 / 1")
})