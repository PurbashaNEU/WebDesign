import { cardState } from "../../models/card.types";
import { withFormik, FormikProps, Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import { selectToken } from "../../redux/reducers/userReducers";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { userState, cred_token } from "../../models/user.types";
import { selectUser } from "../../redux/reducers/userReducers";
import { RootState } from "../../redux/store";
import * as Yup from "yup";
import { useEffect } from "react";
import { addCards } from "../../services/users/cards/cards";

export default function NewCard() {
    // Initial state of card
    const initialValues: cardState = {
        card_name: "",
        card_no: "",
        card_type: "",
        card_bank_name: "",
        card_expiry: new Date(""),
        card_cvv: "",
        card_billing_date: new Date(""),
        card_status: ""
    };
// redux state 
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user: userState = useTypedSelector(selectUser);
    const token: cred_token = useTypedSelector(selectToken);



    return (
        <>
        {/* react formik form */}
            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { resetForm }: FormikHelpers<cardState>): Promise<void> => {
                    try {

                        const payload = {
                            card_name: values.card_name,
                            card_no: values.card_no,
                            card_type: values.card_type,
                            card_bank_name: values.card_bank_name,
                            card_expiry: values.card_expiry,
                            card_cvv: values.card_cvv,
                            card_billing_date: values.card_billing_date,
                            card_status: values.card_status,
                            user_id: user.id
                        }
                        const res = await addCards(`/card`, payload);
                        if (res.status === 200) {
                            resetForm();
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }

                }}

                validationSchema={Yup.object().shape({
                    card_name: Yup.string()
                        .required("Please enter name")
                        .matches(/^[a-z ,.'-]+$/i, "Invalid name"),
                    card_no: Yup.string()
                        .required("Card Number is required")
                        .matches(/^[0-9]{16,16}$/i, "Invalid card number"),
                    card_type: Yup.string()
                        .required("Please enter card type")
                        .matches(/^[a-z ,.'-]+$/i, "Invalid card type"),
                    card_bank_name: Yup.string()
                        .required("Please enter bank name")
                        .matches(/^[a-z ,.'-]+$/i, "Invalid bank name"),
                    card_expiry: Yup.date()
                        .required('Expiry date is required'),
                    card_cvv: Yup.string()
                        .required("Card CVV is required")
                        .matches(/^[0-9]{3,3}$/i, "Invalid card number"),
                    card_billing_date: Yup.date()
                        .required('Billing date is required')
                        .nullable(),
                    card_status: Yup.string()
                        .required('Card status is required'),
                })}
            >
                <div className="container mt-4">
                    <Form>
                        <div className="row g-3">
                            <div className="col-12">
                                <div className="form-floating">
                                    <Field
                                        type="text"
                                        name="card_name"
                                        id="card_name"
                                        className="form-control"
                                        placeholder="Your CardName"
                                    />
                                    <label htmlFor="card_name">CardHolder Name</label>
                                    <ErrorMessage name='card_name' component="div" className="error" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-floating">
                                    <Field
                                        type="string"
                                        name="card_no"
                                        id="card_no"
                                        className="form-control"
                                        placeholder="Your Card No"
                                    />
                                    <label htmlFor="card_no">Card Number</label>
                                    <ErrorMessage name='card_no' component="div" className="error" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-floating">
                                    <Field
                                        type="string"
                                        name="card_type"
                                        id="card_type"
                                        className="form-control"
                                        placeholder="Your Card Type"
                                    />
                                    <label htmlFor="card_type">Card Type</label>
                                    <ErrorMessage name='card_type' component="div" className="error" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-floating">
                                    <Field
                                        type="string"
                                        name="card_bank_name"
                                        id="card_bank_name"
                                        className="form-control"
                                        placeholder="Your Card Bank Name"
                                    />
                                    <label htmlFor="subjcard_bank_nameect">Card Bank Name</label>
                                    <ErrorMessage name='card_bank_name' component="div" className="error" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-floating">
                                    <Field
                                        type="month"
                                        name="card_expiry"
                                        id="card_expiry"
                                        className="form-control"
                                        placeholder="Your Card Expiry"
                                    />
                                    <label htmlFor="card_expiry">Card Expiry Date</label>
                                    <ErrorMessage name='card_expiry' component="div" className="error" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-floating">
                                    <Field
                                        type="string"
                                        name="card_cvv"
                                        id="card_cvv"
                                        className="form-control"
                                        placeholder="Your Card CVV"
                                    />
                                    <label htmlFor="card_cvv">Card CVV</label>
                                    <ErrorMessage name='card_cvv' component="div" className="error" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-floating">
                                    <Field
                                        type="date"
                                        name="card_billing_date"
                                        id="card_billing_date"
                                        className="form-control"
                                        placeholder="Your Card Billing Date"
                                    />
                                    <label htmlFor="card_billing_date">Card Billing Date</label>
                                    <ErrorMessage name='card_billing_date' component="div" className="error" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-floating">
                                    <Field
                                        type="string"
                                        name="card_status"
                                        id="card_status"
                                        className="form-control"
                                        placeholder="Your Card Status"
                                    />
                                    <label htmlFor="card_status">Card Status</label>
                                    <ErrorMessage name='card_status' component="div" className="error" />
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary py-3 px-4" type="submit">Add</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </Formik>
        </>
    )
}