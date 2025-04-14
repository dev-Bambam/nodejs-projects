import joi from "joi";

const registrationSchema = joi.object({
   userName: joi.string().min(3).max(20).required().messages({
      "string.base": "Username should be a type of text",
      "string.empty": "username cannot be an empty field",
      "string.min": "username should have a minimum length of {#limit}",
      "string.max": "username should have a maximum length of {#limit}",
      "any.required": "username is a required field",
   }),
   email: joi.string().email().required().messages({
      "string.email": "please provide a valid email",
      "any.required": "email is a required field",
   }),
   password: joi.string().min(6).required().messages({
      "string.min": "password should have a minimum length of {$limit}",
      "any.required": "password is a required field",
   }),
   bio: joi.string().optional(),
});

const loginSchema = joi.object({
    userInput: joi.string().required().messages({
        'string.base': 'input should be a type text or email',
        'string.empty': 'username or email cannot be empty',
        'any.required': 'username or email is required'
    }),
    password: joi.string().min(6).required().messages({
        'string.min': 'password should have a minimum length of {#limit}',
        'any.required': 'password is required'
    })
})

export const validateRegistration = (userData) => {
   return registrationSchema.validate(userData, { abortEarly: false });
};

export const validateLogin = (userData) => {
    return loginSchema.validate(userData, {abortEarly: false})
}
