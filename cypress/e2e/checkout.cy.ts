describe('Process of buying 3 products', () => {
  beforeEach(() => {
    cy.fixture('products.json').then((products) => {
      // Mock the API response for getting all products
      cy.intercept('GET', '**/products', products).as('getAllProducts');

      // Mock individual product responses
      products.forEach((product: any) => {
        cy.intercept('GET', `**/products/${product.id}`, product).as(`getProduct${product.id}`);
      });
    });
  });

  it('should complete checkout with 2 products from home page and one from search bar', () => {
    cy.visit('/');
    cy.wait('@getAllProducts');

    // Add first product from the home page
    cy.get('.product-card').eq(0).click();
    cy.wait('@getProduct1');
    cy.get('input[type="number"]').clear().type('1');
    cy.get('button[aria-label="Añadir al carrito"]').click();
    cy.on('window:alert', cy.stub());
    cy.go('back');

    // Add second product from the home page
    cy.get('.product-card').eq(1).click();
    cy.wait('@getProduct2');
    cy.get('input[type="number"]').clear().type('1');
    cy.get('button[aria-label="Añadir al carrito"]').click();
    cy.on('window:alert', cy.stub());
    cy.go('back');

    // Search for the third product and add it to the cart
    cy.get('input[placeholder="Buscar..."]').type('Jacket');
    cy.wait(300);
    cy.contains('.product-card', 'Jacket').click();
    cy.wait('@getProduct3');
    cy.get('input[type="number"]').clear().type('1');
    cy.get('button[aria-label="Añadir al carrito"]').click();
    cy.on('window:alert', cy.stub());

    // Go to basket and complete form
    cy.get('button[routerlink="/basket"]').click();
    cy.get('input[formcontrolname="nombre"]').type('Juan');
    cy.get('input[formcontrolname="apellido"]').type('Pérez');
    cy.get('input[formcontrolname="direccion"]').type('Calle Falsa 123');
    cy.get('input[formcontrolname="cp"]').type('28080');
    cy.get('input[formcontrolname="telefono"]').type('600123456');

    // Proceed to payment
    cy.contains('Proceder al pago').should('not.be.disabled').click();

    // Complete payment form
    cy.get('input[formcontrolname="cardNumber"]').type('4999 9999 9999 9999');
    cy.get('input[formcontrolname="expiry"]').type('12/25');
    cy.get('input[formcontrolname="cvc"]').type('123');

    cy.contains('Pagar').should('not.be.disabled').click();

    // Wait till spinner disappears
    cy.get('mat-spinner', { timeout: 5000 }).should('not.exist');

    // Finally, check if the confirmation page is displayed
    cy.url().should('include', '/payment/confirmation');
    cy.contains('Pago completado');
  });
});
