describe('Home Screen e2e', function () {
  it('should display initial length of results, then scroll and search', () => {
    cy.visit('http://localhost:3000');
    cy.get('.repository-list').find('li').its('length').should('eq', 10);
    cy.scrollTo(0, 2000);
    cy.wait(3000);
    cy.get('.repository-list').find('li').its('length').should('eq', 20);
    cy.get('input[data-testid="search-home"]').as('searchText');
    cy.get('@searchText').type('java');
    cy.wait(1000);
    cy.get('.repository-list').find('li').its('length').should('lt', 20);
  });
});
