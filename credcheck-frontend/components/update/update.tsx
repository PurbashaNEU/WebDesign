import { withFormik, FormikProps, Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { updateUser } from "../../services/users/users";
import Router from "next/router";
import { addUser, selectToken } from "../../redux/reducers/userReducers";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { userState, cred_token } from "../../models/user.types";
import { initialUserState, selectUser } from "../../redux/reducers/userReducers";
import { RootState } from "../../redux/store";
import { useState } from "react";
import Link from "next/link";

interface UserFormValues {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

export default function UpdateForm() {


    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user: userState = useTypedSelector(selectUser);
    const token: cred_token = useTypedSelector(selectToken);

    const initialValues: UserFormValues = {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, { resetForm }: FormikHelpers<UserFormValues>) => {
                const payload = {
                    id: user.id,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    username: values.username,
                    email: values.email,
                    password: values.password
                }
                const res = await updateUser(payload);
                if (res.status === 200) {
                    resetForm();
                }

            }}
            validationSchema={Yup.object().shape({
                firstname: Yup.string()
                    .required('Please enter first name')
                    .matches(/^[a-z ,.'-]+$/i, "Invalid firstname"),
                lastname: Yup.string()
                    .required('Please enter last name')
                    .matches(/^[a-z ,.'-]+$/i, "Invalid lastname"),
                email: Yup.string()
                    .email()
                    .required('Please enter email address')
                    .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Invalid email address"),
                password: Yup.string()
                    .required("Please enter password")
                    .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                        "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
                confirm_password: Yup.string()
                    .required("Please confirm your password")
                    .oneOf([Yup.ref('password'), null], "Passwords don't match."),
            })}
        >
            {({ errors, touched }) => (
                <>
                 <h3>Update Page</h3>
                <Form>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="form-floating">
                                <Field
                                    type="firstname"
                                    name="firstname"
                                    id="firstname"
                                    className="form-control"
                                    placeholder="Your Name"
                                />
                                <label htmlFor="firstname">First Name</label>
                                <ErrorMessage name='firstname' component="div" className="error" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <Field
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    className="form-control"
                                    placeholder="Your Name"
                                />
                                <label htmlFor="lastname">Last Name</label>
                                <ErrorMessage name='lastname' component="div" className="error" />

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <Field
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="form-control"
                                    placeholder="Your Username"
                                />
                                <label htmlFor="username">Username</label>
                                <ErrorMessage name='username' component="div" className="error" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <Field
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Your Email"
                                />
                                <label htmlFor="email">Email address</label>
                                <ErrorMessage name='email' component="div" className="error" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Your Password"
                                />
                                <label htmlFor="password">Password</label>
                                <ErrorMessage name='password' component="div" className="error" />

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <Field
                                    type="password"
                                    name="confirm_password"
                                    id="confirm_password"
                                    className="form-control"
                                    placeholder="Your Confirm Password"
                                />
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <ErrorMessage name='confirm_password' component="div" className="error" />

                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary">Update</button>
                          
                        </div>
                    </div>
                </Form>
                </>
            )}
        </Formik>


    );
}
