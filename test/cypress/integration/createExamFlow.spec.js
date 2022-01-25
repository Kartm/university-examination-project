const serverId = 'c3oqqszj'
const serverDomain = 'c3oqqszj.mailosaur.net'

const ownerEmail = 'owner@' + serverDomain
const participant1Email = 'participant1@' + serverDomain

let checkResultsLink;

describe('Create exam flow', () => {
    it('clear email', () => {
        cy.mailosaurDeleteAllMessages(serverId);
    })

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
        // const inOneMinute = new Date(now.getTime() + 60_000 * 1)
        const inTwoMinutes = new Date(now.getTime() + 60_000 * 2)

        const formatDateForDatetimeField = (date) => {
            return date.toISOString().substring(0, 16)
        }

        cy.get('input').eq(0).type(ownerEmail)
        cy.get('input').eq(1).type('TestTitle')
        cy.get('input').eq(2).type('OwnerName')
        cy.get('input').eq(3).type(formatDateForDatetimeField(now), {delay: 100}).trigger('change')
        cy.get('input').eq(4).type(formatDateForDatetimeField(inTwoMinutes), {delay: 100}).trigger('change')
    })

    it('navigates to adding participant page', () => {
        cy.get('button').eq(1).click()
        cy.url().should('include', '/editor/participants')
    })

    it('adds a participant', () => {
        const name = 'PersonName'
        cy.get('input').eq(0).type(participant1Email)
        cy.get('input').eq(1).type(name)
        cy.get('button').eq(0).click();
        cy.contains(participant1Email)
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
        cy.get('a').contains('Single Choice Answer').click({force: true})
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
        cy.get('input[placeholder="Please write your question here"]').type('MultipleChoiceQuestion')
        cy.get('button').contains('Select question type').click()
        cy.get('a').contains('Multiple Choice Answer').click({force: true})
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

    it('publishes the exam', () => {
        cy.get('button').click()
    })



    it('receives an email', () => {
        cy.mailosaurGetMessage(serverId, {
            subject: 'Your exam results available here'
        }).then(email => {
            checkResultsLink = email.text.links[0].href
            cy.log(checkResultsLink)
        })
    })

    it('navigates to result page', () => {
        cy.visit(checkResultsLink)
    })
})

describe('Completes the test successfully', () => {

    let joinExamLink;

    it('receives an email', () => {
        cy.mailosaurGetMessage(serverId, {
            subject: 'Please participate to exam'
        }).then(email => {
            joinExamLink = email.text.links[0].href
            cy.log(joinExamLink)
        })
    })

    it('navigates to start exam page', () => {
        cy.visit(joinExamLink)
    })

    it('navigates to start exam page', () => {
        cy.get('button').click()
        cy.url().should('include', '/questions')
    })

    it('completes both questions', () => {
        cy.get('h2:visible').then(($h2) => {
            const text = $h2.text();
            if (text.indexOf('Multiple') >= 0) {

                cy.getByLabel('a').click()
                cy.getByLabel('b').click()
                cy.getByLabel('c').click()

            } else if (text.indexOf('Single') >= 0) {
                cy.log("Found single")
                cy.getByLabel('a').click()
            }
        })
    })
    it('navigates to next question', () => {
        cy.get('button').contains('Next').click()
        cy.url().should('include', '/questions')
    })


    it('completes both questions', () => {
        cy.get('h2:visible').then(($h2) => {
            const text = $h2.text();
            if (text.indexOf('Multiple') >= 0) {

                cy.getByLabel('a').click()
                cy.getByLabel('b').click()
                cy.getByLabel('c').click()

            } else if (text.indexOf('Single') >= 0) {
                cy.log("Found single")
                cy.getByLabel('a').click()
            }
        })
    })

    it('navigates to next question', () => {
        cy.get('button').contains('Submit').click()
        cy.url().should('include', '/finish')
    })
})



describe('Check results flow', () => {
    it('navigates to result page', () => {
        cy.visit(checkResultsLink)
    })

    it('has full (4) points', () => {
        cy.contains('4')
    })
})