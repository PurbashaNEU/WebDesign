import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { userState,cred_token} from '../../models/user.types';

 export interface initialUserState{
    user:userState,
    token:cred_token
}

const initialState:initialUserState = {
    user:{
        id:"",
        firstname:"",
        lastname:"",
        username:"",
        email:"",
        status:"",
       
    },
    token:{
        cred_token:"" 
    }
    
 }

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        addUser:(state,action:PayloadAction<initialUserState>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    }
});

export const {
    addUser
} = userSlice.actions

export const selectUser = (state:RootState) => state.user.user;


export const selectToken = (state:RootState) => state.user.token;

export default userSlice.reducer
