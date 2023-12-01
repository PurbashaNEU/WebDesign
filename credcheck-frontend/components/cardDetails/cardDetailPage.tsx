import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { selectToken } from "../../redux/reducers/userReducers";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { userState, cred_token } from "../../models/user.types";
import { selectUser } from "../../redux/reducers/userReducers";
import { fetchCardDetails } from "../../services/users/cards/cards"; 
import { fetchTransactionDetails, fetchTransactionByMonth } from "../../services/transaction";
import { RootState } from "../../redux/store";
import { fetchAmountDue } from '../../services/expenditure';
import  TransactionDetailPage  from './transactionDetails/transactionDetailPage';
import Link from "next/link";
import { setDefaultResultOrder } from "dns";

export default function CardDetailPage() {
    const router = useRouter();
    const cardId: String = router.query.id;
    const[showPay,setShowPay] = useState(false);
    const[amountDue, setAmountDue] = useState(0);
    const [cardDetail, setCardDetail] = useState();
    const [transactionDetail, setTransactionDetail] = useState();

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user: userState = useTypedSelector(selectUser);
    const token: cred_token = useTypedSelector(selectToken);

    const getCardDetails = async () => {
        try {
            if (!(user.email === '')) {
                const res = await fetchCardDetails(cardId);
                if (res.status === 200) {
                    setCardDetail(res?.data?.cardDetail);
                    getTransactionDetails();
                    dueDate(res?.data?.cardDetail?.card_billing_date);
                    getTransactionByMonth();
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

    const getTransactionByMonth = async () => {
        const res = await fetchTransactionByMonth(cardId);
        
        if (res && res.data && res.data.transactionHappened && res.data.transactionHappened.length > 0) {
            setShowPay(false);
            setAmountDue(0);
        } else {
            getAmountDueForThisMonth();
        }
    }

    const getAmountDueForThisMonth = async () => {
        const res = await fetchAmountDue(cardId);
        if (res && res.data && res.data.totalAMt) {
            setAmountDue(res.data.totalAMt);
        } 

    }


    const dueDate = (value:any) => {
        let date = new Date(value);
        let new_date = new Date();
        const days_left = date.getDate() - new_date.getDate();
        console.log("original date", days_left);
         if(days_left < 2 || days_left == 2){
             setShowPay(true);
         }
     }

    const getTransactionDetails = async () => {
        try {
            const res = await fetchTransactionDetails(cardId);
            setTransactionDetail(res?.data?.transactions);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCardDetails();
    }, [cardId]);
    return (
        <div className="container">
            <div className = "d-flex flex-row-reverse"> <Link className="float-right btn btn-primary" href={`/expenditure/${cardId}`}>
                Expenditure</Link> </div>
            <div className="d-flex flex-row align-items-center justify-content-around">
                         
                <div className="cred-card">
                    <div className="front side">
                        <span className="companyname">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"></img>
                        </span>
                        <span className="cardnumber">
                            <ul>
                                <li>{cardDetail?.['card_no'].slice(0,4)}</li>
                                <li>{cardDetail?.['card_no'].slice(4,8)}</li>
                                <li>{cardDetail?.['card_no'].slice(8,12)}</li>
                                <li>{cardDetail?.['card_no'].slice(12,16)}</li>
                            </ul>
                        </span>
                        <table className="cardholder">
                            <tbody>
                                <tr>
                                    <td className="name small">CARD HANDLER</td>
                                    <td className="expiry small">EXPIRES</td>

                                </tr>
                                <tr>
                                    <td className="name">{cardDetail?.['card_name']}</td>
                                  
                                    <td className="expiry">{cardDetail?.['card_expiry'].slice(0,7)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    Due Date: {cardDetail?.['card_billing_date'].split('T')[0]}
                </div>

                <div>
                    Amount Due: ${amountDue}
                </div>
                { showPay && <Link  href={
                    {pathname: '/paymentgateway',
                    query: {
                        id: cardId,
                        amountDue: amountDue
                    }}
                }
                 className="btn btn-success"> PAY </Link>}
            </div>
            <div className="h4 mt-3 text-center mb-2"> Past Transactions</div>
           {transactionDetail && transactionDetail?.length > 0 && <div>
                
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th> Transaction Amount</th>
                            <th> Transaction Date</th>
                            <th> Transaction Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactionDetail && transactionDetail.map( transactionItem => {
                                return <TransactionDetailPage
                                    key = {transactionItem._id}
                                    transactionData = {transactionItem}
                                />
                            })
                        }
                    </tbody>

                </table>
            </div>}
            {!transactionDetail || transactionDetail?.length == 0 && <div className="h6; text-primary mt-4 text-center">No Transactions Available</div>}
        </div>
    )
}