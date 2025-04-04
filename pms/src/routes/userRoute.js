import express from "express";
import * as controller from "./../controllers/userController.js";

const router = express.Router();

router.route("/registration").post(controller.userRegistration);
router.route("/login").post(controller.userLogin);


export default router;