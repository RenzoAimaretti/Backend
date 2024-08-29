import { Router } from "express";
import { addOneReview, deleteOneReview } from "./review.controler.js";
export const contentRouter = Router();
contentRouter.post("/:idContent/:id", addOneReview);
contentRouter.delete("/:idContent/:id", deleteOneReview);
//# sourceMappingURL=content.routes.js.map