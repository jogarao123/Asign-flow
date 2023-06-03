
export const URL='http://localhost:8080'
export const ROLE_CODE_REVIEWER='ROLE_CODE_REVIEWER';
export const IN_REVIEW="In Review";
export const SUBMITTED="Submitted";
export const NEEDS_UPDATE="Needs Update";
export interface User {
   id: any;
   cohortStartDate: string;
   username: string;
   password: string;
}
export interface LoginCredentials {
   username: string,
   password: string
}
export interface DecodedToken{
   authorities:string[],
   exp:number,
   iat:number,
   sub:string
}
export interface Assignment {
   id: any;
   status: string;
   githubUrl: string | null;
   branch: string | null;
   codeReviewVideoUrl: string | null;
   user: User;
   codeReviewer:User,
   number:any;
}
export interface AssignmentEnum{
   assignmentNum: number,
   assignmentName: string
}

export interface AssignmentStatusEnum{
   status:string,
   step:number
}

export interface AssignmentMetadata{
   assignmentEnums:AssignmentEnum[],
   assignmentStatusEnums:AssignmentStatusEnum[]
}

export interface CallApiParams{
   method:'GET'|'POST'|'PUT'|'DELETE',
   token?:string,
   body?:any
}
