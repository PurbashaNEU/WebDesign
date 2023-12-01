import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { selectToken } from "../../redux/reducers/userReducers";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import ExpenditureDetailsPage from "./expenditureItem/expenditureItem";
import ExpenditureChart from "./expenditureChart/expenditureChart";
import { userState, cred_token } from "../../models/user.types";
import { selectUser } from "../../redux/reducers/userReducers";
import { fetchExpenditureDetails } from "../../services/expenditure";
import { RootState } from "../../redux/store";

export default function ExpenditurePage() {
    const router = useRouter();
    const cardId: String = router.query.id;

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user: userState = useTypedSelector(selectUser);
    const token: cred_token = useTypedSelector(selectToken);
    const [expenditureDetails, setExpenditureDetails] = useState();

    const getExpenditureDetails = async () => {
        try {
            if (!(user.email === '')) {
                const res = await fetchExpenditureDetails(cardId);
                if (res.status === 200) {
                    console.log(res);
                    setExpenditureDetails(res?.data?.expenditure);
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
        getExpenditureDetails();
    }, [cardId]);

    return (
        <div className = "container">
             {expenditureDetails && expenditureDetails?.length > 0 && <div>
                <ExpenditureChart expenditureDetails={expenditureDetails}/>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th> Expenditure Amount</th>
                            <th> Expenditure Date</th>
                            <th> Expenditure Location</th>
                            <th> Expenditure Type</th>
                            <th> Expenditure Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenditureDetails && expenditureDetails.map( expenditureItem => {
                                return <ExpenditureDetailsPage
                                    key = {expenditureItem._id}
                                    expenditureData = {expenditureItem}
                                />
                            })
                        }
                    </tbody>

                </table>


            </div>}
            {!expenditureDetails || expenditureDetails?.length == 0 && <div className="h6; text-primary mt-4 text-center">No Transactions Available</div>}
        </div>
    )
}