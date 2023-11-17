export default class AddCandidatePage{
    elements = {
        saveBTN: () => cy.get('button').contains('Save'),
        CancelBTN: () => cy.get('button').contains('Cancel'),
        editBTN: () => cy.get('[type = "checkbox"]'),
        resumeInput: () => cy.get('[type = "file"]'),
        acceptBTNs: () => cy.get('.oxd-button--success'),
        rejectBTNs: () => cy.get('.oxd-button--danger'),
        status: () => cy.get('.orangehrm-recruitment-status > .oxd-text')
    }

    actions = {
        clickSaveBTN: () => this.elements.saveBTN().click({force: true}),
        clickCancelBTN: () => this.elements.CancelBTN().click({force: true}),
        clickAcceptBTN: (label: string) => this.elements.acceptBTNs().contains(label).click({force: true}),
        clickRejectBTN: (label: string) => this.elements.rejectBTNs().contains(label).click({force: true}),
        checkStatus: (expected: string) => this.elements.status().should('contain.text', expected)
    }

    // private fileName = '';

    // addResume = (path:string) => {
    //     return this.elements.resumeInput().selectFile(path, {force:true})
    // }

    // addCandidateWithResume = (candidate:any) => {
    //     this.elements.firstName().type(candidate.firstName).should('have.value', candidate.firstName);
    //     this.elements.lastName().type(candidate.lastName).should('have.value', candidate.lastName);
    //     this.elements.vacancySelect().click();
    //     this.elements.selectOption().eq(1).click();
    //     this.elements.email().type(candidate.email).should('have.value', candidate.email);;
        
        
    //     this.addResume(candidate.resumePath).then(() => {
    //         this.elements.saveBTN().click();

    //         // finding uploaded file name
    //         this.fileName = candidate.resumePath.split('/')[candidate.resumePath.split('/').length -1]

    //         // two assertions in one command
    //         this.elements.resumeLabel().should('have.text', this.fileName + ' ');
    //     })
        
    // }



}