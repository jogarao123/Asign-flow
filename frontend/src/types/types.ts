
export const URL='http://localhost:8080'
export interface User {
   id: number;
   cohortStartDate: string;
   username: string;
   password: string;
}

export interface Assignment {
   id: number;
   status: string;
   githubUrl: string | null;
   branch: string | null;
   codeReviewVideoUrl: string | null;
   assignedTo: User;
}
