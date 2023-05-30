import {CallApiParams, URL} from "../types/types.ts";

export const callApi = async (path: string, {method = 'GET', body = null, token = ''}: CallApiParams) => {
   const headers: Record<string, string> = {
      'Content-Type': 'application/json',
   };

   if (token) {
      headers['Authorization'] = `Bearer ${token}`;
   }
   const url = `${URL}${path}`;
   const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
   });

   if (!response.ok) {
      throw new Error('Failed to fetch data');
   }

   return response.json();
}
export const createAssignment = (body:any,jwt:string) => {
   return callApi('/api/assignments',{method:'POST',body,token:jwt});
}
export const updateAssignment = (id: string, body: any, jwt: string) => {
   return callApi(`/api/assignments/${id}`, {method: 'PUT', token: jwt, body});
}
export const fetchAssignmentById = (id: string, jwt: string) => {
   return callApi(`/api/assignments/${id}`, {method: 'GET', token: jwt});
}

export const fetchAssignments = (jwt: string) => {
   return callApi(`/api/assignments`, {method: 'GET', token: jwt});
}
