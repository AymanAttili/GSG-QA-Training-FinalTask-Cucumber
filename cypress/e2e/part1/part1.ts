import { When, Given, Then, After } from "@badeball/cypress-cucumber-preprocessor";
import AddEmployeePage from "../../support/PageObjects/PIM/AddEmployeePage";
import JobTitlesPage from "../../support/PageObjects/Admin/Job/JobTitlesPage";
import VacanciesPage from "../../support/PageObjects/Recruitment/VacanciesPage";
import CandidatesPage from "../../support/PageObjects/Recruitment/CandidatesPage";
import AddCandidatePage from "../../support/PageObjects/Recruitment/AddCandidatePage";
import ChangeCandidateVacancyStatusPage from "../../support/PageObjects/Recruitment/ChangeCandidateVacancyStatusPage";

const addEmployeePage: AddEmployeePage = new AddEmployeePage();
const jobTitlesPage: JobTitlesPage = new JobTitlesPage();
const vacanciesPage: VacanciesPage = new VacanciesPage();
const candidatesPage: CandidatesPage = new CandidatesPage();
const addCandidatePage: AddCandidatePage = new AddCandidatePage();
const changeCandidateVacancyStatusPage: ChangeCandidateVacancyStatusPage = new ChangeCandidateVacancyStatusPage();

const fixturePath = 'cypress/fixtures/firstPartData.json'
let empNums: number[] = [];
let jobTitleIds: number[] = [];
let vacancyIds: number[] = [];
let candidateIds: number[] = [];
let initData: any;

// Givens
Given("The system has an Employee, a Job Title and a Vacancy", () => {
  cy.login();

  cy.fixture('firstPartData').as('data');

  cy.get('@data').then((data: any) => {
    initData = data;
    let employee = data.employee;
    let jobTitle = data.jobTitle;
    let vacancy = data.vacancy;
    let candidate = data.candidate;

    addEmployeePage.createEmployee(employee).then((empNumber: number) => {
      empNums.push(empNumber)
      vacancy.employeeId = empNumber;

      jobTitlesPage.createJobTitle(jobTitle).then((jobTitleId: number) => {
        jobTitleIds.push(jobTitleId);
        vacancy.jobTitleId = jobTitleId;

        vacanciesPage.createVacancy(vacancy).then((vacancyId: number) => {
          vacancyIds.push(vacancyId);
          candidate.vacancyId = vacancyId;

          data.candidate = candidate;

          cy.writeFile(fixturePath, data)
        })
      })
    })
  })

});

Given("The candidate has a status of application initiated", () => {
  cy.get('@data').then((data: any) => {
    let candidate = data.candidate;
    candidatesPage.createCandidate(candidate).then((canId: number) => {
      candidate.id = canId;

      data.candidate = candidate;

      candidateIds.push(canId);

      cy.writeFile(fixturePath, data)
    });
  })

  cy.logout();
});

// Whens
When("Log in as an Admin", () => {
  cy.login();
});

When("Access the candidate form", () => {
  cy.get('@data').then((data: any) => {
    let candidate = data.candidate;
    candidatesPage.visitCandidate(candidate.id);
  })
});


When("Change the candidate status to Interview {string}", (status) => {
  cy.get('@data').then((data: any) => {
    let interview = data.interview;
    let employee = data.employee;

    addCandidatePage.actions.clickAcceptBTN('Shortlist');
    changeCandidateVacancyStatusPage.actions.clickSaveBTN();
    addCandidatePage.actions.clickAcceptBTN('Schedule Interview');
    changeCandidateVacancyStatusPage.actions.enterInterviewTitle(interview.title);
    changeCandidateVacancyStatusPage.actions.enterInterviewer(employee.firstName);
    changeCandidateVacancyStatusPage.actions.selectAutocompleteOption();
    changeCandidateVacancyStatusPage.actions.enterDate(interview.date);
    changeCandidateVacancyStatusPage.actions.clickSaveBTN();
    if (status == 'Passed')
      addCandidatePage.actions.clickAcceptBTN(`Mark Interview ${status}`);
    else
      addCandidatePage.actions.clickRejectBTN(`Mark Interview ${status}`);
    changeCandidateVacancyStatusPage.actions.clickSaveBTN();
  })
});

// Thens
Then("The Admin should successfully transition the candidate's status to Interview {string}", (status) => {
  addCandidatePage.actions.checkStatus(`Interview ${status}`)
});



After(() => {
  cy.log(initData);
  cy.writeFile(fixturePath, initData);

  addEmployeePage.deleteEmployees(empNums);
  empNums = [];
  jobTitlesPage.deleteJobTitles(jobTitleIds);
  jobTitleIds = [];
  vacanciesPage.deleteVacancies(vacancyIds);
  vacancyIds = [];
  candidatesPage.deleteCandidates(candidateIds);
  candidateIds = [];
})