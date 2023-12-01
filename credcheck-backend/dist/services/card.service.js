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
exports.getAllCards = exports.getCardDetail = exports.updateCards = exports.getCards = exports.createCard = void 0;
const cards_schema_1 = __importDefault(require("../models/cards/cards.schema"));
const createCard = (card) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_cards = yield cards_schema_1.default.findOneOrCreate(card);
        return new_cards;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.createCard = createCard;
const getCards = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cards = yield cards_schema_1.default.findByUserId(id);
        return cards;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getCards = getCards;
const updateCards = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCard = yield cards_schema_1.default.findByIdAndUpdate(id, payload);
        console.log("inside update", updatedCard);
        return updatedCard;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.updateCards = updateCards;
const getCardDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardDetail = yield cards_schema_1.default.findById(id);
        return cardDetail;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getCardDetail = getCardDetail;
const getAllCards = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cards = yield cards_schema_1.default.find();
        return cards;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getAllCards = getAllCards;
/*
export function blockCards(arg0: string) {
    try{
        const new_cards = await cardModel.findByIdAndUpdate();
        return new_cards
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
} */
// export function updateCards(arg0: string) {
//     throw new Error("Function not implemented.");
// }
