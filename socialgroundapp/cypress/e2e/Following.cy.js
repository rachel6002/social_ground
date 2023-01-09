
/* eslint-disable semi */
describe('Test that we can follow a user', () => {
    // launch the web app
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    });
    it('see if login contains elements', () => {
        Cypress.config('defaultCommandTimeout', 6000);
        // check that the button with caption 'Sign in' is displayed
        cy.get('button').contains('Log In')
        // click on the Sign In button
        cy.get('button').click()
        // check that the link with caption 'Log In' is displayed
        cy.contains('Log In')
        cy.contains('Invalid Credentials.')
        // check url path
        cy.url().should('include', '3000')
    });
    // cy.get('button').contains('Create Student')
    it('type in user information, test wrong email format', () => {
        cy.get('#formInput1').type('testUser').should('have.value', 'testUser')
        cy.get('#formInput2').type('Banana').should('have.value', 'Banana')

        // click on the login button
        cy.contains('Log In').click()
        // test that error message is displayed
        cy.contains('Invalid Credentials.')
    });
    it('type in user information, test wrong password combination', () => {
        cy.get('#formInput1').type('demo123@gmail.com').should('have.value', 'demo123@gmail.com')
        cy.get('#formInput2').type('Banana').should('have.value', 'Banana')
  
        // click on the login button
        cy.contains('Log In').click()
        // test that error message is displayed
        cy.contains('Invalid Credentials.')
    });

    it('passes if all correct', () => {
        // log in if all correct
        cy.get('#formInput1').type('demo123@gmail.com').should('have.value', 'demo123@gmail.com')
        cy.get('#formInput2').type('123').should('have.value', '123')

        // click on the login button
        cy.contains('Log In').click()
        cy.get('#cypress-find-feed').click()
        // cy.contains('xinyuesh');
        cy.get('#CypressLogout').click()
    });

    it('make sure it is directed to the Find page if this user doesn\'t follow anyone yet',() => {
        // log in if all correct
        cy.get('#formInput1').type('demo123@gmail.com').should('have.value', 'demo123@gmail.com')
        cy.get('#formInput2').type('123').should('have.value', '123')

        // click on the login button
        cy.contains('Log In').click()

        cy.contains('Suggestions')
        cy.contains('Find Friends on Social Ground')
        cy.url().should('include', '/Find')
        cy.get('#cypress-find-feed').click()
        // cy.contains('xinyuesh');
        cy.get('#CypressLogout').click()

    });

    it('type \'xin\' in the textfield and check if xinyuesh occurs and is able to follow',() => {
        // log in if all correct
        cy.get('#formInput1').type('demo123@gmail.com').should('have.value', 'demo123@gmail.com')
        cy.get('#formInput2').type('123').should('have.value', '123')
        
        // click on the login button
        cy.contains('Log In').click()
        cy.url().should('include', '/Find')

        cy.get('#outlined-basic').type('xin')
        cy.contains('xinyuesh')
        cy.get('button').contains('Follow').click()
        cy.visit('http://localhost:3000/Profile')
        cy.get('#cypress_test_following').click()
        cy.contains('xinyuesh');
        cy.get('#cypress-find-feed').click()
        // cy.contains('xinyuesh');
        cy.get('#CypressLogout').click()
    });

    it('when logged in again, we will be directed to feed directly',() => {
        // log in if all correct
        cy.get('#formInput1').type('demo123@gmail.com').should('have.value', 'demo123@gmail.com')
        cy.get('#formInput2').type('123').should('have.value', '123')
        
        // click on the login button
        cy.contains('Log In').click()
        cy.url().should('include', '/Feed')
        cy.contains('xinyuesh')

        cy.visit('http://localhost:3000/Profile')
        cy.get('#cypress_test_following').click()
        cy.contains('xinyuesh');
        cy.get('#cypress-find-feed').click()
        cy.contains('xinyuesh');
        cy.get('#CypressLogout').click()

    });

    it('unfollow that user', () => {
        cy.get('#formInput1').type('demo123@gmail.com').should('have.value', 'demo123@gmail.com')
        cy.get('#formInput2').type('123').should('have.value', '123')
        cy.contains('Log In').click()
        cy.url().should('include', '/Feed')
        cy.visit('http://localhost:3000/Profile')
        cy.get('#cypress_test_following').click()
        cy.contains('xinyuesh');
        // cy.get('button').contains('Follow').click()
        cy.get('button').contains('Unfollow').click()
        cy.get('#cypress-find-feed').click()
        cy.get('#CypressLogout').click()
    });
  })
  