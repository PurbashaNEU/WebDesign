"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
const code = process.env.STRIPE_SECRET_TEST;
const stripe = new stripe_1.default('sk_test_51MBLVGLuyMIpPjBgL1iFAQ8qxO7roc7Qm9ZQZ2PGDrIAlmlHxSaXKXwdZxXqQArcIsTvyJSGFznRum2UdWlZfKNV00LY3SP9Pu', {
    apiVersion: '2022-11-15',
});
const payment = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.username;
        const card_no = req.card_no;
        const amount = req.amount;
        const id = req.id;
        const payment_check = yield stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: "",
            payment_method: id,
            confirm: true,
        });
        console.log("stripe-routes.js 19 | payment", payment_check);
        return payment_check;
    }
    catch (e) {
        console.log(e);
    }
});
exports.payment = payment;
