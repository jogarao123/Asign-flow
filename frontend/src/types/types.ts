
export const URL='http://localhost:8080'
export interface User {
   id: any;
   cohortStartDate: string;
   username: string;
   password: string;
}

export interface Assignment {
   id: any;
   status: string;
   githubUrl: string | null;
   branch: string | null;
   codeReviewVideoUrl: string | null;
   assignedTo: User;
}
