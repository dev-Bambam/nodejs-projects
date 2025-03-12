import express from "express";
import * as controller from "./../controllers/userController.js";

const router = express.Router();

router.route("/registration").post(controller.userRegistration);


export default router;