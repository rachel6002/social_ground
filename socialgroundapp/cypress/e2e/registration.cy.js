/* eslint-disable semi */
describe('Test that we can create a new user', () => {
  // launch the web app
  beforeEach(() => {
    cy.visit('http://localhost:3000/registration')
  });
  it('see if registration contains elements', () => {
    // check that the button with caption 'Sign Up' is displayed
    cy.get('button').contains('Sign Up')
    // click on the Sign Up button
    cy.get('button').click()
    // check that the link with caption 'Log In' is displayed
    cy.contains('Sign Up')
    cy.contains('Sign up to see photos and videos from others.')
    cy.contains('Already have an account?')
    // check url path
    cy.url().should('include', '/registration')
  });
  // cy.get('button').contains('Create Student')
  it('type in user information, test wrong password match', () => {
    cy.get('#formInput12').type('testUser').should('have.value', 'testUser')
    cy.get('#formInput6').type('Banana').should('have.value', 'Banana')
    cy.get('#formInput7').type('testing123@gmail.com').should('have.value', 'testing123@gmail.com')
    cy.get('#formInput8').type('testPW').should('have.value', 'testPW')
    cy.get('#formInput9').type('testConfirmPW').should('have.value', 'testConfirmPW')

    // click on the login button
    cy.contains('Sign Up').click()
    // test that error message is displayed
    cy.contains('Your password entries do not match. Please re-enter.')
  });
  it('type in user information, test wrong email format', () => {
    cy.get('#formInput12').type('testUser').should('have.value', 'testUser')
    cy.get('#formInput6').type('Banana').should('have.value', 'Banana')
    cy.get('#formInput7').type('testing123@gmail.com').should('have.value', 'testing123@gmail.com')
    cy.get('#formInput8').type('testPW').should('have.value', 'testPW')
    cy.get('#formInput9').type('test111').should('have.value', 'test111')

    // click on the login button
    cy.contains('Sign Up').click()
    // test that error message is displayed
    cy.contains('Your password entries do not match. Please re-enter.')
  });
  it('type in user information, test missing information', () => {
    cy.get('#formInput6').type('Banana').should('have.value', 'Banana')
    cy.get('#formInput7').type('testing123@gmail').should('have.value', 'testing123@gmail')
    cy.get('#formInput8').type('testPW').should('have.value', 'testPW')
    cy.get('#formInput9').type('testPW').should('have.value', 'testPW')

    // click on the login button
    cy.contains('Sign Up').click()
    // test that error message is displayed
    cy.contains('One or more fields is/are missing. Please fill in all fields.')
  });
  it('passes if all correct', () => {
    // create a new user
    // type the information of the user
    // test that the username, full name, email,
    // password, confirm password input box is updated correctly
    cy.get('#formInput12').type('testUser').should('have.value', 'testUser')
    cy.get('#formInput6').type('Banana').should('have.value', 'Banana')
    cy.get('#formInput7').type('testing123@gmail.com').should('have.value', 'testing123@gmail.com')
    cy.get('#formInput8').type('testPW').should('have.value', 'testPW')
    cy.get('#formInput9').type('testPW').should('have.value', 'testPW')

    // click on the login button
    cy.contains('Sign Up').click()
  });
})
