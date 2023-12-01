import { CardElement, useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
// import styles from './payemntgateway.scss';
import { useRouter } from "next/router";
import  confirmPayment  from '../../services/payment';
import { useEffect, useState } from 'react';
import { selectToken } from "../../redux/reducers/userReducers";
import Router from "next/router";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { userState, cred_token } from "../../models/user.types";
import { selectUser } from "../../redux/reducers/userReducers";
import { fetchCardDetails } from "../../services/users/cards/cards"; 
import { RootState } from "../../redux/store";
import { addTransactionDetails } from "../../services/transaction";

export const PaymentGatewayForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  let errMsg = '';

  const cardId: String = router.query.id;
  const amountDue: String = router.query.amountDue;

  const [cardDetail, setCardDetail] = useState();

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const user: userState = useTypedSelector(selectUser);
  const token: cred_token = useTypedSelector(selectToken);

  const getCardDetails = async () => {
    try {
        if (!(user.email === '')) {
            const res = await fetchCardDetails(cardId);
            if (res.status === 200) {
                setCardDetail(res?.data?.cardDetail);
            }
            else {
                console.log(res?.message)
            }
        }

    }
    catch (e) {
        console.log(e)
    }
}

useEffect(() => {
  getCardDetails();
}, [user]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    errMsg = '';
     const { error, paymentMethod } = await stripe?.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardNumberElement),
      card: elements?.getElement(CardCvcElement),
      card: elements?.getElement(CardExpiryElement),
      key: 'pk_test_51MBLVGLuyMIpPjBgZ3dU6XT2l7RyxAhSmceojNYyKDkukwBrzsrFx4DirzrWvMvsJVxqivfIhZaIWRtexWNQQpBj00GcOD9D4W'
    });

   if (!error) {
      //send token to backend here
      const { id } = paymentMethod;
      const res = await confirmPayment(id, amountDue);
      if (res && res.status === 200) {
        const payload = {
          card_no: cardDetail?.['card_no'],
          status : "success",
          amount_paid: amountDue,
          due_date: cardDetail?.['card_billing_date'],
          transaction_date: Date.now(),
          card_id: cardDetail?.['_id']
        }
        const addTransactionDetail = await addTransactionDetails(payload);

        if (addTransactionDetail && addTransactionDetail.status === 200) {
          Router.push('/');
          alert ("transaction done");
          
        }
      } else {
        console.log(res);
      }
    } else {
      errMsg = error;
    } 
  };
    return (
        <div className = 'container'>
          <div className="d-flex align-items-center mb-2 justify-content-between">

           <div> 
           Amount to be paid:
            ${amountDue} </div>
            <div> Card Holder Name: {cardDetail?.['card_name']}  </div>
            <div> card Number: {cardDetail?.['card_no']} </div>

          </div>
            <form onSubmit={handleSubmit}>

            <div className="form-floating"> 
              <CardNumberElement className="form-control mb-2"/>
              <label htmlFor="Card-CVC">Card Number</label>
            </div>

            <div className="form-floating">
              <CardCvcElement className="form-control mb-2"/>
              <label htmlFor="Card-CVC">Card CVC</label>
            </div>
              
            <div className="form-floating">
              <CardExpiryElement className="form-control mb-2"/>
              <label htmlFor="Card-CVC">Card Expiry</label>
            </div>
            <button className="btn btn-primary mt-2">Pay</button>
            <p className = "txt-danger mt-2">{errMsg}</p>
            </form>
        </div>

    )   
}