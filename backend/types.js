const { z } = require("zod");

const userSchemaSignup = z.object({
    username: z.string().trim().toLowerCase().min(3).max(50).email(),
    password: z.string().trim().min(6),
    firstName: z.string().trim().toLowerCase().min(3).max(50),
    lastName: z.string().trim().toLowerCase().min(3).max(50),
}).strict();

const userSchemaSignin = z.object({
    username: z.string().trim().toLowerCase().min(3).max(50).email(),
    password: z.string().trim().min(6),
}).strict();

const userSchemaStrict = z.object({
    password: z.string().trim().min(6),
    firstName: z.string().trim().toLowerCase().min(3).max(50),
    lastName: z.string().trim().toLowerCase().min(3).max(50),
}).strict();

const userSchemaBulk = z.string().trim().default("");

const userSchemaTranfer = z.object({
    to: z.string().trim(),
    amount: z.number().positive(),
}).strict();

module.exports = {
    userSchemaSignin,
    userSchemaSignup,
    userSchemaStrict,
    userSchemaBulk,
    userSchemaTranfer,
}