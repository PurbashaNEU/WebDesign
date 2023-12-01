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
exports.fetchExpenditureByCardIdDate = exports.fetchExpenditureByCardId = exports.addExpenditureDetail = void 0;
const expenditure_schema_1 = __importDefault(require("../models/expenditure/expenditure.schema"));
const addExpenditureDetail = (expenditure) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newExpenditure = yield expenditure_schema_1.default.create(expenditure);
        return newExpenditure;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.addExpenditureDetail = addExpenditureDetail;
const fetchExpenditureByCardId = (cardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenditureDetails = yield expenditure_schema_1.default.find({ card_id: cardId });
        return expenditureDetails;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.fetchExpenditureByCardId = fetchExpenditureByCardId;
const fetchExpenditureByCardIdDate = (cardId, currMonth) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenditureList = yield expenditure_schema_1.default.find({ card_id: cardId, expenditure_trasaction_date: { $gte: currMonth } });
        return expenditureList;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.fetchExpenditureByCardIdDate = fetchExpenditureByCardIdDate;
