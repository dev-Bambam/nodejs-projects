import express from "express";
import * as controller from "controllers/auth.controller";

const router = express.Router();

router.route("/registration").post(controller.signup);
router.route("/login").post(controller.userLogin);

export default router;
