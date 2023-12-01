import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentGatewayForm } from '../components/payemntgateway/paymentgateway';
import { STRIPE_KEY } from "../constants/stripe_Key";

const stripePromise = loadStripe(STRIPE_KEY.PUBLIC_KEY);

const PaymentGateway = () => {
    console.log('stripePromise ', stripePromise);
    return (
        <Elements stripe={stripePromise}>
            <PaymentGatewayForm/>
        </Elements>
        
    );
    
}

export default PaymentGateway;