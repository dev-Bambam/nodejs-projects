import Joi from "joi";

export const signUpVal = Joi.object({
   firstName: Joi.string().min(2).max(60).required().messages({
      "string.base": "firstName must be a string",
      "string.empty": "firstName can not be empty",
      "string.min": "firstName must be atleast 2 characters long",
      "string.max": "firstName must be 60 characters long",
      "any.required": "first name is required",
   }),
   lastName: Joi.string().min(2).max(60).required().messages({
      "string.base": "lastName must be a string",
      "string.empty": "lastName can not be empty",
      "string.min": "lastName must be atleast 2 characters long",
      "string.max": "lastName must be 60 characters long",
      "any.required": "lastName is required",
   }),
   password: Joi.string()
      .required()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
      .messages({
         "string.base": "password must be a string",
         "any.required": "password is required",
         "string.pattern.base":
            "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
   email: Joi.string().email().required().messages({
       "string.base": "email can not be empty",
       'any.required': 'email is required',
       'string.email': 'please input a valid email'
   }),
});
