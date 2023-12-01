import { addUser, selectToken } from "../../redux/reducers/userReducers";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { userState, cred_token } from "../../models/user.types";
import { initialUserState, selectUser } from "../../redux/reducers/userReducers";
import { RootState } from "../../redux/store";
import Link from 'next/link';
import { useAuthListener } from "../session";
import Router from "next/router";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function Header() {
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user: userState = useTypedSelector(selectUser);
    const token: cred_token = useTypedSelector(selectToken);

    const dispatch = useDispatch();

    const logoutUser = () => {
        localStorage.removeItem('cred-users');
        localStorage.removeItem('cred-token');
        const payload: initialUserState = {
            user: {
                id: "",
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                status: "",

            },
            token: {
                cred_token: ""
            }
        }
        dispatch(addUser(payload));
        Router.push('/login')
    }

    return (
        console.log(!(user.email === ''), user.email),
        <div>
            <nav className="d-flex navbar navbar-expand-lg bg-white navbar-light sticky-top">
                <a href="index.html" className="navbar-brand d-flex align-items-center">
                    <h2 className="m-0 text-primary"><img className="img-fluid me-2" src="img/icon-1.png" alt=""
                        style={{ width: 45 + 'px' }} />CredCheck</h2>
                </a>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-4 py-lg-0">
                        <div className="nav-item">
                            {
                                !(user.email === '') &&
                                <button className="btn btn-primary m-2" onClick={() => logoutUser()}>Logout</button>
                            }

                        </div>
                        <div className="right dropdown">
                            {

                                !(user.email === '') &&
                                <Dropdown className="m-2">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                       {user.username}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    <Dropdown.Item> <Link className='btn btn-primary btn-addnew' href="/update-profile">Update Profile</Link></Dropdown.Item>
                                       
                                    </Dropdown.Menu>
                                </Dropdown>
                            }


                        </div>

                    </div>


                </div>
            </nav>
        </div>
    )
}