import * as service from "./../services/userService.js";
import { validateRegistration, validateLogin } from "../utils/validators/userValidator.js";

export const userRegistration = async (req, res) => {
   const { error } = validateRegistration(req.body);
   if (error) {
      return res.status(400).json({
         status: "fail",
         message: error.details.map((err) => err.message).join(", "),
      });
   }
   const userData = req.body;
   try {
      const newUser = await service.creatUser(userData);
      return res.status(201).json({
         status: "success",
         message: "user created successfully",
         data: newUser,
      });
   } catch (error) {
      return res.status(400).json({
         status: "fail",
         message: error.message,
      });
   }
};

export const userLogin = async (req, res) => {
   const { error } = validateLogin(req.body);
   if (error) {
      return res.status(400).json({
         status: "fail",
         message: error.details.map((err) => err.message).join(", "),
      });
   }
   const userData = req.body;
   const { userInput, password } = userData;

   try {
      let user;

       if (userInput.includes("@")) {
          const email = userInput
         user = await service.findUserByEmail(email);
       } else {
           const userName = userInput
         user = await service.findUserByUsername(userName);
      }
      if (!user) {
         return res.status(400).json({
            status: "fail",
            message: "invalid username or email",
         });
      } else {
         const verified = await service.verifyPassword(user, password);
         if (!verified) {
            return res.status(401).json({
               status: "fail",
               message: "incorrect password",
            });
         } else {
            res.status(200).json({
               status: "success",
               message: "user logged in",
            });
         }
      }
   } catch (error) {
      return res.status(400).json({
         status: "error",
         message: `error occured: ${error.message}`,
      });
   }
};
