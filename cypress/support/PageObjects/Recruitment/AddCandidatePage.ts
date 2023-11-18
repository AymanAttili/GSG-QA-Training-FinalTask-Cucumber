import { IScheduleInterviewPayload } from "../../helpers/APIHelpers/IScheduleInterviewPayload";

export default class AddCandidatePage{
    elements = {
        saveBTN: () => cy.get('button').contains('Save'),
        CancelBTN: () => cy.get('button').contains('Cancel'),
        editBTN: () => cy.get('[type = "checkbox"]').eq(0),
        resumeInput: () => cy.get('[type = "file"]'),
        acceptBTNs: () => cy.get('.oxd-button--success'),
        rejectBTNs: () => cy.get('.oxd-button--danger'),
        status: () => cy.get('.orangehrm-recruitment-status > .oxd-text'),
        inputGroup: (label: string) => cy.get('.oxd-input-group').contains(label).parent().parent(),
        filePreview: () => cy.get('.orangehrm-file-current')
    }

    actions = {
        clickSaveBTN: () => this.elements.saveBTN().click({force: true}),
        clickCancelBTN: () => this.elements.CancelBTN().click({force: true}),
        clickAcceptBTN: (label: string) => this.elements.acceptBTNs().contains(label).click({force: true}),
        clickRejectBTN: (label: string) => this.elements.rejectBTNs().contains(label).click({force: true}),
        checkStatus: (expected: string) => this.elements.status().should('contain.text', expected),
        switchEditBTN: () => this.elements.editBTN().click({force: true}),
        uploadResume: (path: string) => this.elements.resumeInput().selectFile(path, {force: true}),
        downloadResume: () => this.elements.inputGroup('Resume').within(() => {
            this.elements.filePreview().click();
        })
    }

    URLs = {
        shortlist: (id: number) => {return `/web/index.php/api/v2/recruitment/candidates/${id}/shortlist`},
        scheduleInterview: (id: number) => {return `/web/index.php/api/v2/recruitment/candidates/${id}/shedule-interview`},
        passInterview: (id: number) => {return `/web/index.php/api/v2/recruitment/candidates/${id}/interviews/1/pass`},
        offerJob: (id: number) => {return `/web/index.php/api/v2/recruitment/candidates/${id}/job/offer`},
        hire: (id: number) => {return `/web/index.php/api/v2/recruitment/candidates/${id}/hire`}
    }

    shortlist = (id: number) => {
        return cy.request({
            method: 'PUT',
            url: this.URLs.shortlist(id),
            body: {}
        })
    }

    scheduleInterview = (id: number, interviewData: IScheduleInterviewPayload) => {
        return cy.request({
            method: "POST",
            url: this.URLs.scheduleInterview(id),
            body: interviewData
        })
    }

    passInterview = (id: number) => {
        return cy.request({
            method: 'PUT',
            url: this.URLs.passInterview(id),
            body: {}
        })
    }

    offerJob = (id: number) => {
        return cy.request({
            method: 'PUT',
            url: this.URLs.offerJob(id),
            body: {}
        })
    }

    hire = (id: number) => {
        return cy.request({
            method: 'PUT',
            url: this.URLs.hire(id),
            body: {}
        })
    }

}