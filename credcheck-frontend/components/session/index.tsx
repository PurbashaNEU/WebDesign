
import { useCallback, useEffect, useState } from "react"
import storage from "../../models/session.types"
import { addUser, selectToken } from "../../redux/reducers/userReducers";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { userState, cred_token } from "../../models/user.types";
import { initialUserState, selectUser } from "../../redux/reducers/userReducers";
import { RootState } from "../../redux/store";
import Router from "next/router";




export const useAuthListener = () => {

    const dispatch = useDispatch();


    const getUser = useCallback(async (): Promise<void> => {
        try {
            let user = localStorage.getItem('cred-users');
            let token = localStorage.getItem('cred-token');
            console.log('entered');
            if (user && token) {
               
                const payload: initialUserState = {
                    user: JSON.parse(user as string),
                    token: {
                        cred_token: token
                    }
                }
                dispatch(addUser(payload));
              
            }
           
        }
        catch (e) {
            console.log(e);
        }
    }, [])

    useEffect(() => {
        getUser();

    }, [getUser])


}