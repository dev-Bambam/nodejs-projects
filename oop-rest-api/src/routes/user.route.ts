import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoute {
   private readonly controller: UserController;
   public readonly router: Router;

   constructor() {
      // console.log("request got here")
      this.controller = new UserController();
      this.router = Router();
      this.initRoutes();
   }
   private initRoutes() {
      console.log('req got here')
      this.router
         .route("/")
         .post(this.controller.create.bind(this.controller))
         .get(this.controller.findAll.bind(this.controller));
   }
}

export default new UserRoute().router