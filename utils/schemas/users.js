const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const usernameSchema = joi.string().alphanum().min(3).max(30);
const passwordSchema = joi.string().alphanum().min(3).max(30);
const emailSchema = joi.string().email();
const createdSchema = joi.date();

const createUserSchema = {
  username: usernameSchema.required(),
  password: passwordSchema.required(),
  email: emailSchema.required(),
  created: createdSchema
};

const loginUserSchema = {
  username: usernameSchema.required(),
  password: passwordSchema.required()
};

const updateUserSchema = {
  username: usernameSchema,
  password: passwordSchema,
  email: emailSchema,
  created: createdSchema
};

module.exports = {
  userIdSchema,
  createUserSchema,
  loginUserSchema,
  updateUserSchema
};