Feature: Part 1

    Scenario: Candidate Interview Result Verification -> Pass

        Given The system has an Employee, a Job Title and a Vacancy
        Given The candidate has a status of application initiated

        When Log in as an Admin
        And Access the candidate form
        And Change the candidate status to Interview "Passed"

        Then The Admin should successfully transition the candidate's status to Interview "Passed"


    Scenario: Candidate Interview Result Verification -> Fail

        Given The system has an Employee, a Job Title and a Vacancy
        And The candidate has a status of application initiated

        When Log in as an Admin
        And Access the candidate form
        And Change the candidate status to Interview "Failed"

        Then The Admin should successfully transition the candidate's status to Interview "Failed"
