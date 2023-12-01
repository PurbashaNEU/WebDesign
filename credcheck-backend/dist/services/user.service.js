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
exports.getUser = exports.updateUserData = exports.createUser = void 0;
const user_schema_1 = __importDefault(require("../models/users/user.schema"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_user = yield user_schema_1.default.findOneOrCreate(user);
        return new_user;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
});
exports.createUser = createUser;
const updateUserData = (userId, updatedReq) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateUser = yield user_schema_1.default.findByIdAndUpdate(userId, updatedReq);
        return updateUser;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
});
exports.updateUserData = updateUserData;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.default.findUser(id);
        return user;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
});
exports.getUser = getUser;
