/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      fillContactForm: typeof fillContactForm;
      checkValidationError: typeof checkValidationError;
      checkFormPersistence: typeof checkFormPersistence;
    }
  }
}

const fillContactForm = (data: {
  name?: string;
  email?: string;
  message?: string;
  phone?: string;
  company?: string;
}) => {
  if (data.name) cy.get('input[name="name"]').type(data.name);
  if (data.email) cy.get('input[name="email"]').type(data.email);
  if (data.message) cy.get('textarea[name="message"]').type(data.message);
  if (data.phone) cy.get('input[name="phone"]').type(data.phone);
  if (data.company) cy.get('input[name="company"]').type(data.company);
};

const checkValidationError = (field: string, errorMessage: string) => {
  cy.contains(errorMessage).should('be.visible');
};

const checkFormPersistence = (data: {
  name: string;
  email: string;
  message: string;
}) => {
  cy.reload();
  cy.get('input[name="name"]').should('have.value', data.name);
  cy.get('input[name="email"]').should('have.value', data.email);
  cy.get('textarea[name="message"]').should('have.value', data.message);
};

Cypress.Commands.add('fillContactForm', fillContactForm);
Cypress.Commands.add('checkValidationError', checkValidationError);
Cypress.Commands.add('checkFormPersistence', checkFormPersistence);

export {};