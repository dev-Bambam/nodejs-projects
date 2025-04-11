import express from 'express'
import { createNewPost } from "../controller/postController";
import  reqValidation  from "../middleware/validationMW";
import { testVal } from "../validator/authValidator";
const router = express.Router();

router.post(
   "/",
   reqValidation(testVal),
   createNewPost
);

export default router;
