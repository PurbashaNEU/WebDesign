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
exports.fetchTransactionByMonth = exports.fetchTransactionByCardId = exports.addTransactionDetail = void 0;
const transaction_schema_1 = __importDefault(require("../models/transactions/transaction.schema"));
const addTransactionDetail = (transaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTransaction = yield transaction_schema_1.default.create(transaction);
        return newTransaction;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.addTransactionDetail = addTransactionDetail;
const fetchTransactionByCardId = (cardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionDetails = yield transaction_schema_1.default.find({ card_id: cardId });
        return transactionDetails;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.fetchTransactionByCardId = fetchTransactionByCardId;
const fetchTransactionByMonth = (cardId, currentMonth) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionData = yield transaction_schema_1.default.find({ card_id: cardId, expenditure_trasaction_date: { $gte: currentMonth } });
        return transactionData;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.fetchTransactionByMonth = fetchTransactionByMonth;
