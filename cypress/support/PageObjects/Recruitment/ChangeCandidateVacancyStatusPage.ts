export default class ChangeCandidateVacancyStatusPage{
    elements = {
        saveBTN: () => cy.get('[type = submit]'),
        CancelBTN: () => cy.get('button').contains('Cancel'),
        input: () => cy.get('.oxd-input'),
        autocompleteInput: () => cy.get('.oxd-autocomplete-text-input'),
        autocompleteOption: () => cy.get('.oxd-autocomplete-option'),
        getGridItem: (label: string) => cy.get('.oxd-grid-item').contains(label).parent().parent()
    }

    URLs = {
        interviewers: '/web/index.php/api/v2/recruitment/interviewers?nameOrId=*',
    }

    actions = {
        clickSaveBTN: () => this.elements.saveBTN().click(),
        clickCancelBTN: () => this.elements.CancelBTN().click(),
        enterInterviewTitle: (title: string) => this.elements.getGridItem('Interview Title').within(() => {
            this.elements.input().type(title);
        }),
        enterInterviewer: (name: string) => this.elements.getGridItem('Interviewer').within(() => {
            cy.intercept(this.URLs.interviewers).as('interviewers');
            this.elements.autocompleteInput().type(name);
            cy.wait('@interviewers');
        }),
        selectAutocompleteOption: () => this.elements.autocompleteOption().eq(0).click(),
        enterDate: (date: string) => this.elements.getGridItem('Date').within(() => {
            this.elements.input().type(date);
        })
    }
}