import { ICreateVacancyPayload } from "../../helpers/APIHelpers/ICreateVacancyPayload";

class VacanciesPage{
    
    URLs = {
        vacancies: '/web/index.php/api/v2/recruitment/vacancies'
    }

    createVacancy = (vacancyData: ICreateVacancyPayload) => {
        return cy.request({
            method: 'POST',
            url: this.URLs.vacancies,
            body: vacancyData
        }).its('body').its('data').its('id');
    }

    deleteVacancies = (ids:number[]) => {
        cy.request({
            method: 'DELETE',
            url: this.URLs.vacancies,
            body:{
                ids: ids
            }
        })
    }
}

export default VacanciesPage;