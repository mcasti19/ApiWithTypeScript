"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaValidation = void 0;
const zod_1 = require("zod");
exports.UserSchemaValidation = zod_1.z.object({
    name: zod_1.z.string(),
    username: zod_1.z.string().min(4),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().refine(val => val.length > 5, val => ({ message: `${val} is not more than 6 characters` }))
});
