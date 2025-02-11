"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const server_1 = __importDefault(require("@server/server"));
const dotenv_1 = __importDefault(require("dotenv"));
require("@config/db");
dotenv_1.default.config();
const port = process.env.PORT || 4000;
server_1.default.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
