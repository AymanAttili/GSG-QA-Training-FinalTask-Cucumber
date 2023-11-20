export interface ICreateVacancyPayload{
    "name": string,
    "jobTitleId": number,
    "employeeId": number,
    "numOfPositions": number,
    "description": string,
    "status": boolean,
    "isPublished": boolean
}