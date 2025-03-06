/// <reference types="cypress" />
/// <reference path="../support/commands.d.ts" />

describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact');
    cy.intercept('POST', `${Cypress.env('apiUrl')}/contact`).as('contactRequest');
  });

  it('should submit form successfully with all fields', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message from Cypress',
      phone: '1234567890',
      company: 'Test Company'
    };

    cy.fillContactForm(formData);
    cy.intercept('POST', '/api/contact', {
      statusCode: 200,
      body: { success: true }
    }).as('submitForm');

    cy.get('button[type="submit"]').click();
    cy.wait('@submitForm');
    cy.contains('¡Mensaje enviado con éxito!').should('be.visible');
  });

  it('should show validation errors for empty required fields', () => {
    cy.get('button[type="submit"]').click();
    
    cy.checkValidationError('name', 'El nombre es requerido');
    cy.checkValidationError('email', 'El email es requerido');
    cy.checkValidationError('message', 'El mensaje es requerido');
  });

  it('should validate email format', () => {
    cy.fillContactForm({ email: 'invalid-email' });
    cy.get('button[type="submit"]').click();
    cy.checkValidationError('email', 'El formato del email es inválido');

    cy.get('input[name="email"]').clear().type('valid@email.com');
    cy.get('button[type="submit"]').click();
    cy.contains('El formato del email es inválido').should('not.exist');
  });

  it('should validate message length', () => {
    cy.fillContactForm({ message: 'short' });
    cy.get('button[type="submit"]').click();
    cy.checkValidationError('message', 'El mensaje debe tener al menos 10 caracteres');

    cy.get('textarea[name="message"]').clear().type('This is a long enough message');
    cy.get('button[type="submit"]').click();
    cy.contains('El mensaje debe tener al menos 10 caracteres').should('not.exist');
  });

  it('should persist form data after page reload', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message for localStorage'
    };

    cy.fillContactForm(formData);
    cy.checkFormPersistence(formData);
  });

  it('should handle server errors gracefully', () => {
    cy.fillContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    });

    cy.intercept('POST', '/api/contact', {
      statusCode: 500,
      body: { message: 'Error del servidor' }
    }).as('serverError');

    cy.get('button[type="submit"]').click();
    cy.wait('@serverError');
    cy.contains('Error del servidor').should('be.visible');
  });

  it('should handle network errors gracefully', () => {
    cy.fillContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    });

    cy.intercept('POST', '/api/contact', {
      forceNetworkError: true
    }).as('networkError');

    cy.get('button[type="submit"]').click();
    cy.contains('Error de conexión').should('be.visible');
  });

  it('should clear form after successful submission', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    };

    cy.fillContactForm(formData);
    
    cy.intercept('POST', '/api/contact', {
      statusCode: 200,
      body: { success: true }
    }).as('submitForm');

    cy.get('button[type="submit"]').click();
    cy.wait('@submitForm');

    cy.get('input[name="name"]').should('have.value', '');
    cy.get('input[name="email"]').should('have.value', '');
    cy.get('textarea[name="message"]').should('have.value', '');
  });

  it('should disable submit button while submitting', () => {
    cy.fillContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    });

    // Use cy.intercept with a delay function
    cy.intercept('POST', '/api/contact', (req) => {
      req.reply({
        delay: 1000,
        statusCode: 200,
        body: { success: true }
      });
    }).as('delayedSubmit');

    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('button[type="submit"]').should('contain', 'Enviando...');
    cy.wait('@delayedSubmit');
    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.get('button[type="submit"]').should('contain', 'Enviar');
  });
});
