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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const card_service_1 = require("../services/card.service");
const user_service_1 = require("../services/user.service");
const path_1 = __importDefault(require("path"));
const hbs = require("nodemailer-express-handlebars");
var transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "develitesweb@gmail.com",
        pass: "idsfrawwgakvupoz",
    },
});
// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path_1.default.resolve("./views/"),
        defaultLayout: false,
    },
    viewPath: path_1.default.resolve("./views/"),
};
transporter.use("compile", hbs(handlebarOptions));
const sendEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("running");
        const cards = yield (0, card_service_1.getAllCards)();
        cards === null || cards === void 0 ? void 0 : cards.map((data) => __awaiter(void 0, void 0, void 0, function* () {
            let d = new Date();
            let bill_date = data.card_billing_date;
            d.setHours(0, 0, 0, 0);
            bill_date.setHours(0, 0, 0, 0);
            bill_date.setDate(bill_date.getDate() - 2);
            if (d.getDate() >= bill_date.getDate()) {
                let user = yield (0, user_service_1.getUser)(data.user_id.toString());
                var mailOptions = {
                    from: "",
                    to: user.email,
                    subject: "CredCheck credit card due",
                    template: "email",
                    context: {
                        name: `${user.firstname}`,
                        card_no: `${data.card_no}`,
                    },
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log("Email sent:" + info.response);
                    }
                });
            }
        }));
    }
    catch (e) {
        console.log(e);
    }
});
exports.sendEmail = sendEmail;
