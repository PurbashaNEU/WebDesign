import Header from '../header/header';
import Footer from '../footer/footer';
import { useAuthListener } from '../session';
import { selectToken } from "../../redux/reducers/userReducers";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { userState, cred_token } from "../../models/user.types";
import { selectUser } from "../../redux/reducers/userReducers";
import { RootState } from "../../redux/store";
import LoginForm from '../login/login';
import { useRouter } from 'next/router';
import Dashboard from '../dashboard/dashboard';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';

export default function Layout({ children }: { children: any }) {

    useAuthListener();
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user: userState = useTypedSelector(selectUser);
    const token: cred_token = useTypedSelector(selectToken);
    const router = useRouter();


    const checkAuth = () => {

        if (user.email === '') {
            if (router.pathname !== '/login' && router.pathname !== '/register') {
                router.push('/login')
            }

        }
        else {

            if (router.pathname === '/login' || router.pathname === '/register') {
                router.push('/');
            }
        }
    }

    useEffect(() => {

        checkAuth();

    }, [user, token, router])



    return (
        <>
            <div className='container container-box'>
                <Header />
                {children}

            </div>
            <Footer />
        </>
    )
}