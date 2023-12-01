"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_middleware_1 = __importDefault(require("./middlewares/error-handler.middleware"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db/db");
const UserRoutes = __importStar(require("./routes/user.routes"));
const AuthRoutes = __importStar(require("./routes/auth.routes"));
const CardRoutes = __importStar(require("./routes/cards.routes"));
const TransactionRoutes = __importStar(require("./routes/transaction.routes"));
const ExpenditureRoutes = __importStar(require("./routes/expenditure.routes"));
const PaymentRoutes = __importStar(require("./routes/payment.routes"));
const verify_jwt_token_middleware_1 = require("./middlewares/verify-jwt-token.middleware");
const email_1 = require("./email/email");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    exposedHeaders: ['Content-Length', 'authorization'],
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const port = process.env.PORT;
(0, db_1.connectDb)();
(0, email_1.sendEmail)();
app.use('/users', UserRoutes.router);
app.use('/login', AuthRoutes.router);
app.use('/card', verify_jwt_token_middleware_1.authenticateToken, CardRoutes.router);
app.use('/transaction', verify_jwt_token_middleware_1.authenticateToken, TransactionRoutes.router);
app.use('/expenditure', verify_jwt_token_middleware_1.authenticateToken, ExpenditureRoutes.router);
// add custom error handler middleware as the last middleware
app.use(error_handler_middleware_1.default);
app.use('/payment', verify_jwt_token_middleware_1.authenticateToken, PaymentRoutes.router);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
