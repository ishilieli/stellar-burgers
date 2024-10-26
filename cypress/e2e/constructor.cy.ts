const ingredients = {
  bun: '[data-cy=bun-ingredients]',
  mains: '[data-cy=mains-ingredients]',
  sauces: '[data-cy=sauces-ingredients]'
};
describe('ingredient addition test in the constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('');
    cy.get('[data-cy=constructor-ingredients]').as('constructorIngredients');
  });
  it('add bun', () => {
    cy.get(ingredients.bun).contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Ингредиент 1')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Ингредиент 1')
      .should('exist');
  });

  it('add ingredient', () => {
    cy.get(ingredients.mains).contains('Добавить').click();
    cy.get(ingredients.sauces).contains('Добавить').click();
    cy.get('@constructorIngredients').contains('Ингредиент 2').should('exist');
    cy.get('@constructorIngredients').contains('Ингредиент 4').should('exist');
  });
});

describe('modal window functionality test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('');
  });
  it('open modal', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Ингредиент 1').should('exist');
  });
  it('close modal by clicking on the cross', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
  it('close modal by clicking on overlay', function () {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('order creation test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccessToken');
    cy.viewport(1300, 800);
    cy.visit('');
    cy.get('[data-cy=constructor-ingredients]').as('constructorIngredients');
  });

  it('add ingredients and create order', () => {
    cy.get(ingredients.bun).contains('Добавить').click();
    cy.get(ingredients.mains).contains('Добавить').click();
    cy.get(ingredients.sauces).contains('Добавить').click();
    cy.get('[data-cy=order-button]').click();

    cy.get('[data-cy=order-number]').as('orderNumber');
    cy.get('@orderNumber').contains('123').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.get('@orderNumber').should('not.exist');

    cy.get('@constructorIngredients')
      .contains('Ингредиент 1')
      .should('not.exist');
    cy.get('@constructorIngredients')
      .contains('Ингредиент 2')
      .should('not.exist');
    cy.get('@constructorIngredients')
      .contains('Ингредиент 4')
      .should('not.exist');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
