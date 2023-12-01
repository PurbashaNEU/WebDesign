import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { getAllCards } from "../services/card.service";
import { getUser } from "../services/user.service";
import path from "path";
const hbs = require("nodemailer-express-handlebars");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "develitesweb@gmail.com",
    pass: "idsfrawwgakvupoz",
  },
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

transporter.use("compile", hbs(handlebarOptions));

export const sendEmail = async () => {
  try {
    console.log("running");
    const cards = await getAllCards();
    cards?.map(async (data) => {
      let d = new Date();
      let bill_date = data.card_billing_date;
      d.setHours(0, 0, 0, 0);
      bill_date.setHours(0, 0, 0, 0);
      bill_date.setDate(bill_date.getDate() - 2);

      if (d.getDate() >= bill_date.getDate()) {
        let user = await getUser(data.user_id.toString());

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
          } else {
            console.log("Email sent:" + info.response);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};
