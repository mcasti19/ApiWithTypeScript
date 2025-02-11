"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoDbURL = process.env.MONGODB_URL_STRING;
exports.default = (async () => {
    try {
        await mongoose_1.default.connect(mongoDbURL);
        console.log('MongoDB connected!!!');
    }
    catch (error) {
        console.log('Error >>', error);
        process.exit(1);
    }
})();
