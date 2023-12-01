import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();
const code = process.env.STRIPE_SECRET_TEST;

const stripe = new Stripe('sk_test_51MBLVGLuyMIpPjBgL1iFAQ8qxO7roc7Qm9ZQZ2PGDrIAlmlHxSaXKXwdZxXqQArcIsTvyJSGFznRum2UdWlZfKNV00LY3SP9Pu',{
    apiVersion:'2022-11-15',
});

export const payment = async(req: any) :Promise<any> => {
   try{
        const username = req.username;
        const card_no = req.card_no;
        const amount = req.amount;
        const id = req.id;
     const payment_check = await stripe.paymentIntents.create({
        amount:amount,
        currency:"USD",
        description:"",
        payment_method:id,
        confirm:true,
     });
     console.log("stripe-routes.js 19 | payment", payment_check);
    return payment_check
    }
    catch (e) {
        console.log(e);
    }
}