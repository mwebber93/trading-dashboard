describe('Order Entry widget', () => {
	beforeEach(() => {
		// Mock server needs to be running for this to work.
		cy.visit('http://localhost:3000');
	});

	it('It should prevent me from entering a non-numeric quantity', () => {
		cy.get('input[name="quantity"]').type('abc');
		cy.get('input[name="price"]').type(100);
		cy.contains('Place Order').click();
		cy.contains('Quantity must be numeric.').should('be.visible');
	});

	it('It should prevent me from entering a quantity less than 0', () => {
		cy.get('input[name="quantity"]').type('-1');
		cy.get('input[name="price"]').type(100);
		cy.contains('Place Order').click();
		cy.contains('Quantity must be greater than 0.').should('be.visible');
	});

	it('It should prevent me from entering a non-numeric price', () => {
		cy.get('input[name="price"]').type(100);
		cy.get('input[name="price"]').type('abc');
		cy.contains('Place Order').click();
		cy.contains('Quantity must be numeric.').should('be.visible');
	});

	it('It should prevent me from entering a price less than 0', () => {
		cy.get('input[name="quantity"]').type(100);
		cy.get('input[name="price"]').type('-1');
		cy.contains('Place Order').click();
		cy.contains('Price must be greater than 0.').should('be.visible');
	});

	it('It should update the order book table if the order is successfully created', () => {
		cy.get('input[name="quantity"]').type(100);
		cy.get('input[name="price"]').type('100');
		cy.contains('Place Order').click();
		cy.get('table').find('tbody tr:last').find('td').should('contain', 'buy');
		cy.get('table').find('tbody tr:last').find('td').should('contain', '£100.00');
		cy.get('table').find('tbody tr:last').find('td').should('contain', '10');
	});
});
