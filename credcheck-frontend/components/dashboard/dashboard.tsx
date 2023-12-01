import Link from 'next/link';
import { useEffect, useState } from 'react';
import { selectToken } from "../../redux/reducers/userReducers";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { userState, cred_token } from "../../models/user.types";
import { selectUser } from "../../redux/reducers/userReducers";
import { RootState } from "../../redux/store";
import { getCards, updateCard } from '../../services/users/cards/cards';


export default function Dashboard() {

    const [cards, setCards] = useState<any[]>([]);

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const user: userState = useTypedSelector(selectUser);
    const token: cred_token = useTypedSelector(selectToken);

    const blockCard = async (id: any, value: String) => {
        if (cards) {
            console.log(id)
            let card = cards.map((data: any) => {
                if (data._id === id) {
                    return data
                }
            });
            card[0]['card_status'] = value;
            const res = await updateCard(cards[0]);
            if (res.status === 200) {
                getUserCards();
            }

        }
    }

    const getUserCards = async () => {
        try {
            if (!(user.email === '')) {
                const res = await getCards(`/card/user/${user.id}`);
                console.log(res);
                if (res.status === 200) {
                    setCards(res?.data?.data);
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
        getUserCards();
    }, [user])

    return (

        <div>
            <span>
                <Link className='btn btn-primary btn-addnew' href="/addcard">Add Card</Link>
            </span>
            <div className='row'>
                {
                    cards && cards.map(data =>
                        data.card_status === 'BLOCKED' ?
                            (
                                <div className="cred-card col-6" key={data?._id}>
                                    <div className="front side blocked">
                                        <span className="companyname">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"></img>
                                        </span>
                                        <span className="cardnumber">
                                            <ul>
                                                <li>{data.card_no.slice(0, 4)}</li>
                                                <li>{data.card_no.slice(4, 8)}</li>
                                                <li>{data.card_no.slice(8, 12)}</li>
                                                <li>{data.card_no.slice(12, 16)}</li>
                                            </ul>
                                        </span>
                                        <table className="cardholder">
                                            <tbody>
                                                <tr>
                                                    <td className="name small">CARD HANDLER</td>
                                                    <td className="expiry small">EXPIRES</td>

                                                </tr>
                                                <tr>
                                                    <td className="name">{data.card_name}</td>

                                                    <td className="expiry">{data.card_expiry.slice(0, 7)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <button className="btn btn-primary m-1" onClick={() => blockCard(data?._id, 'ACTIVE')}>ACTIVE</button>

                                </div>
                            ) : (


                                <div className="cred-card col-6" key={data?._id}>
                                    <Link href={`/carddetail/${data?._id}`}>
                                        <div className="front side">
                                            <span className="companyname">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"></img>
                                            </span>
                                            <span className="cardnumber">
                                                <ul>
                                                    <li>{data.card_no.slice(0, 4)}</li>
                                                    <li>{data.card_no.slice(4, 8)}</li>
                                                    <li>{data.card_no.slice(8, 12)}</li>
                                                    <li>{data.card_no.slice(12, 16)}</li>
                                                </ul>
                                            </span>
                                            <table className="cardholder">
                                                <tbody>
                                                    <tr>
                                                        <td className="name small">CARD HANDLER</td>
                                                        <td className="expiry small">EXPIRES</td>

                                                    </tr>
                                                    <tr>
                                                        <td className="name">{data.card_name}</td>

                                                        <td className="expiry">{data.card_expiry.slice(0, 7)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Link>
                                    {/* <button className="btn btn-primary m-1">Edit</button> */}
                                    <button className="btn btn-primary m-1" onClick={() => blockCard(data?._id, "BLOCKED")}>Blocked</button>

                                </div>

                            )
                    )
                }
            </div>
        </div>
    )
}