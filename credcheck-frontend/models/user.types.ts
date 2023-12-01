import { string } from "yup";

export  interface userTypes  {
    firstname:string,
    lastname:string,
    username:string,
    email:string,
    password:string,
    gender?:string,
    phone_number?:number,
    address?:string,
    status?:string,
    dob?:string

}

export interface userState {
    id:string,
    firstname:string,
    lastname:string,
    username:string,
    email:string,
    status:string,
   
}

export interface cred_token{
    cred_token:string
}