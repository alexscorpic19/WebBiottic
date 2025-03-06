/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    fillContactForm(data: {
      name?: string;
      email?: string;
      message?: string;
      phone?: string;
      company?: string;
    }): Chainable<void>;

    checkValidationError(field: string, errorMessage: string): Chainable<void>;

    checkFormPersistence(data: {
      name: string;
      email: string;
      message: string;
    }): Chainable<void>;
  }
}