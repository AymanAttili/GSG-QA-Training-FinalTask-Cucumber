import { When, Given, Then, After } from "@badeball/cypress-cucumber-preprocessor";
import AddEmployeePage from "../../support/PageObjects/PIM/AddEmployeePage";
import JobTitlesPage from "../../support/PageObjects/Admin/Job/JobTitlesPage";
import VacanciesPage from "../../support/PageObjects/Recruitment/VacanciesPage";
import CandidatesPage from "../../support/PageObjects/Recruitment/CandidatesPage";
import AddCandidatePage from "../../support/PageObjects/Recruitment/AddCandidatePage";

const addEmployeePage: AddEmployeePage = new AddEmployeePage();
const jobTitlesPage: JobTitlesPage = new JobTitlesPage();
const vacanciesPage: VacanciesPage = new VacanciesPage();
const candidatesPage: CandidatesPage = new CandidatesPage();
const addCandidatePage: AddCandidatePage = new AddCandidatePage();

const fixturePath = 'cypress/fixtures/secondPartData.json';
const downloadedResumePath = 'cypress/downloads/file.txt'
const uploadedResumePath = 'cypress/files/file.txt'
let empNums: number[] = [];
let jobTitleIds: number[] = [];
let vacancyIds: number[] = [];
let candidateIds: number[] = [];
let initData: any;

// Givens
Given("The system has an Employee, a Job Title and a Vacancy", () => {
    cy.login();

    cy.fixture('secondPartData').as('data');

    cy.get('@data').then((data: any) => {
        initData = data;
        let employee = data.employee;
        let jobTitle = data.jobTitle;
        let vacancy = data.vacancy;
        let candidate = data.candidate;
        let interview = data.interview

        addEmployeePage.createEmployee(employee).then((empNumber: number) => {
            empNums.push(empNumber)
            vacancy.employeeId = empNumber;
            interview.interviewerEmpNumbers.push(empNumber)

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

Given("The candidate has a status of Application Initiated", () => {
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

Given("The candidate has a status of Hired", () => {
    cy.get('@data').then((data: any) => {
        let candidate = data.candidate;
        let interview = data.interview
        candidatesPage.createCandidate(candidate).then((canId: number) => {
            candidate.id = canId;
            data.candidate = candidate;

            candidateIds.push(canId);

            cy.writeFile(fixturePath, data)
            
            addCandidatePage.shortlist(canId);
            addCandidatePage.scheduleInterview(canId, interview).then((intId: number) => {
                addCandidatePage.passInterview(canId, intId);
            })
            addCandidatePage.offerJob(canId);
            addCandidatePage.hire(canId);
        });

        
    })

    cy.logout();
})

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


When("Enable Edit candidate switch", () => {
    addCandidatePage.actions.switchEditBTN();
});

When("Upload a txt file to the Resume section", () => {
    addCandidatePage.actions.uploadResume(uploadedResumePath)
});

When("Save the form", () => {
    addCandidatePage.actions.clickSaveBTN();
});

When("Download the uploaded file", () => {
    addCandidatePage.actions.downloadResume();
    cy.wait(3000);
})

// Thens
Then("The downloaded file should contain the same data as was uploaded", () => {
    cy.readFile(uploadedResumePath).then((uploadedResume) => {
        cy.readFile(downloadedResumePath).should('eq', uploadedResume)
    })
})



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