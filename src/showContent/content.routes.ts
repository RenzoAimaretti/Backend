import { Router } from "express";
import {
  addOneReview,
  deleteOneReview,
  editReview,
  getContentReviews,
} from "./review.controller.js";
import {
  addOneComment,
  deleteOneComment,
  editComment,
  getAllComments,
} from "./comment.controller.js";

export const contentRouter = Router();
//tendria que poner aca unos verify token??
contentRouter.post("/:idContent/:id", addOneReview);

contentRouter.delete("/:idContent/:id", deleteOneReview);

contentRouter.get("/:idContent", getContentReviews);

contentRouter.post("/comment/:idContent/:id/:idCommentOwner", addOneComment);

contentRouter.get("/comment/:idContent/:id", getAllComments);

contentRouter.delete(
  "/comment/:idContent/:id/:idCommentOwner",
  deleteOneComment
);

contentRouter.put("/:idContent/:id", editReview);

contentRouter.put("/comment/:idContent/:id/:idCommentOwner", editComment);
