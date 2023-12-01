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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardDetails = exports.updateCardDetails = exports.getUserCardDetails = exports.addCardDetails = void 0;
const cardService = __importStar(require("./../services/card.service"));
const addCardDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardData = yield cardService.createCard(req.body);
        res.send({ "data": cardData });
    }
    catch (err) {
        next(err);
    }
});
exports.addCardDetails = addCardDetails;
const getUserCardDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardData = yield cardService.getCards(req.params.id);
        res.send({ "data": cardData });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserCardDetails = getUserCardDetails;
const updateCardDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cardId, payload = Object.assign({}, req.body);
        if (req && req.body) {
            cardId = req.body._id;
            delete payload['id'];
        }
        const cardData = yield cardService.updateCards(req.body._id, payload);
        res.send({ "data": cardData });
    }
    catch (err) {
        next(err);
    }
});
exports.updateCardDetails = updateCardDetails;
// export const blockCardDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try{
//         const cardData = await cardService.blockCards(req.params.id as string);
//         res.send({"data":cardData});
//     }catch (err){
//         next(err)
//     }
// }
const getCardDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardDetail = yield cardService.getCardDetail(req.params.id);
        res.send({ cardDetail });
    }
    catch (err) {
        next(err);
    }
});
exports.getCardDetails = getCardDetails;
