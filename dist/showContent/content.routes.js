import { Router } from "express";
import { addOneReview, deleteOneReview, getContentReviews } from "./review.controler.js";
export const contentRouter = Router();
contentRouter.post("/:idContent/:id", addOneReview);
contentRouter.delete("/:idContent/:id", deleteOneReview);
contentRouter.get("/:idContent", getContentReviews);
//# sourceMappingURL=content.routes.js.map