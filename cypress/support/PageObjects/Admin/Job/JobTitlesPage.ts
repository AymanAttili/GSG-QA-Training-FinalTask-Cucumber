import { ICreateJobTitlePayload } from "../../../helpers/APIHelpers/ICreateJobTitlePayload";


export default class JobTitlesPage{
    URLs = {
        jobTitles: '/web/index.php/api/v2/admin/job-titles'
    }

    createJobTitle = (payload: ICreateJobTitlePayload) => {
        return cy.request({
            method: 'POST',
            url: this.URLs.jobTitles,
            body: payload
        }).its('body').its('data').its('id');
    }

    deleteJobTitles = (ids: number[]) => {
        return cy.request({
            method: 'DELETE',
            url: this.URLs.jobTitles,
            body:{
                ids: ids
            }
        })
    }
}