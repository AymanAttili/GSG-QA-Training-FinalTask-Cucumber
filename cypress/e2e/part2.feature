Feature: Part 2

    Scenario: Verify that the user can upload a txt file for Application Initiated status

        Given The system has an Employee, a Job Title and a Vacancy
        And The candidate has a status of Application Initiated

        When Log in as an Admin
        And Access the candidate form
        And Enable Edit candidate switch
        And Upload a txt file to the Resume section
        And Save the form
        And Download the uploaded file

        Then The downloaded file should contain the same data as was uploaded


    Scenario: Verify that the user can upload a txt file for Hired status

        Given The system has an Employee, a Job Title and a Vacancy
        And The candidate has a status of Hired

        When Log in as an Admin
        And Access the candidate form
        And Enable Edit candidate switch
        And Upload a txt file to the Resume section
        And Save the form
        And Download the uploaded file

        Then The downloaded file should contain the same data as was uploaded
