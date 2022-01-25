it('Sees the main page', () => {
    cy.visit('http://localhost:8080/')

    cy.contains('Welcome to Pass!')
})

it('Navigates to create', () => {
    cy.get('button').click();
    cy.url().should('include', '/create')
})

it('Chooses a template', () => {
    cy.get('button').click()
})

it('Chooses a template', () => {
    cy.url().should('include', '/editor')
})

it('fills the form', () => {
    const now = new Date();
    const inOneMinute = new Date(now.getTime() + 60_000 * 1)
    const inTwoMinutes = new Date(now.getTime() + 60_000 * 2)

    const formatDateForDatetimeField = (date) => {
        return date.toISOString().substring(0, 16)
    }

    cy.get('input').eq(0).type('254597@student.pwr.edu.pl')
    cy.get('input').eq(1).type('TestTitle')
    cy.get('input').eq(2).type('OwnerName')
    cy.get('input').eq(3).type(formatDateForDatetimeField(inTwoMinutes), {delay: 100}).trigger('change')
    cy.get('input').eq(4).type(formatDateForDatetimeField(inOneMinute), {delay: 100}).trigger('change')
})

it('navigates to adding participant page', () => {
    cy.get('button').eq(1).click()
    cy.url().should('include', '/editor/participants')
})

it('adds a participant', () => {
    const email = '254597@student.pwr.edu.pl'
    const name = 'PersonName'
    cy.get('input').eq(0).type(email)
    cy.get('input').eq(1).type(name)
    cy.get('button').eq(0).click();
    cy.contains(email)
    cy.contains(name)
})

it('navigates to adding participant page', () => {
    cy.get('button').eq(1).click()
    cy.url().should('include', '/editor/questions')
})


it('adds a single choice question', () => {
    cy.get('button').eq(0).click()
    cy.get('input[placeholder="Please write your question here"]').type('SingleChoiceQuestion')
    cy.get('button').contains('Select question type').click()
    cy.get('a').contains('Single Choice Answer').click({force : true})
    cy.get('input[type=number]').type('1')
    const letters = ['a', 'b', 'c', 'd']
    letters.forEach(letter => {
        cy.get('input[placeholder="Please write here a question answer"]').type(letter)
        cy.get('div').contains('+ add an option').click()
    })
    cy.get(`input[value="${letters[0]}"]`).click()
    cy.get('button').contains('Save').click()
})

it('adds a multiple choice question', () => {
    cy.get('button').eq(0).click()
    cy.get('input[placeholder="Please write your question here"]').type('MutlipleChoiceQuestion')
    cy.get('button').contains('Select question type').click()
    cy.get('a').contains('Multiple Choice Answer').click({force : true})
    cy.get('input[type=number]').type('3')
        const letters = ['a', 'b', 'c', 'd']
    letters.forEach(letter => {
        cy.get('input[placeholder="Please write here a question answer"]').type(letter)
        cy.get('div').contains('+ add an option').click()
        cy.get(`input[value="${letter}"]`).click()
    })
    cy.get(`input[value="${letters[letters.length - 1]}"]`).click()
    cy.get('button').contains('Save').click()
})

//TODO : check open answer question

it('navigates to finish page', () => {
    cy.get('button').last().click()
    cy.url().should('include', '/editor/finish')
})
