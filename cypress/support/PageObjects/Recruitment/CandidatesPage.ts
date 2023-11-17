import { ICreateCandidatePayload } from "../../helpers/APIHelpers/ICreateCandidatePayload";

export default class CandidatesPage{
    
    URLs = {
        candidates : '/web/index.php/api/v2/recruitment/candidates',
        addCandidate: '/web/index.php/recruitment/addCandidate/'
    }

    visitCandidate = (candidateId: number) => {
        cy.visit(this.URLs.addCandidate+`${candidateId}`);
    }

    createCandidate = (candidateData: ICreateCandidatePayload) => {
        return cy.request({
            method: 'POST',
            url: this.URLs.candidates,
            body: candidateData
        }).its('body').its('data').its('id');
    }

    deleteCandidates = (ids:number[]) => {
        cy.request({
            method: 'DELETE',
            url: this.URLs.candidates,
            body:{
                ids: ids
            }
        })
    }
}
