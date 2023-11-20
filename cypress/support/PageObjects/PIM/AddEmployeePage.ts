import { ICreateEmployeePayload } from "../../helpers/APIHelpers/ICreateEmployeePayload";
import GenericFunctions from "../../helpers/GenericFunctions";

export default class AddEmployeePage{
    URLs = {
        employees: '/web/index.php/api/v2/pim/employees'
    }

    createEmployee = (empData: ICreateEmployeePayload) => { 
        return cy.request({
            method: 'POST',
            url: this.URLs.employees,
            body:{
                firstName: empData.firstName,
                middleName: empData.middleName,
                lastName: empData.lastName,
                empPicture: null,
                employeeId: `${GenericFunctions.genericRandomNumber(1000)}`
            }
        }).its('body').its('data').its('empNumber');
    }

    deleteEmployees = (ids:number[]) => {
        cy.request({
            method: 'DELETE',
            url: this.URLs.employees,
            body:{
                ids: ids
            }
        })
    }
}