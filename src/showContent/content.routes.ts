import { Router } from "express";
import { addOneReview,deleteOneReview,getContentReviews } from "./review.controler.js";
import { addOneComment, deleteOneComment, getAllComments } from "./comment.controler.js";

export const contentRouter=Router();

contentRouter.post("/:idContent/:id",addOneReview);

contentRouter.delete("/:idContent/:id",deleteOneReview)

contentRouter.get("/:idContent",getContentReviews)

contentRouter.post("/comment/:idContent/:id/:idCommentOwner",addOneComment)

contentRouter.get("/comment/:idContent/:id",getAllComments)

contentRouter.delete("/comment/:idContent/:id/:idCommentOwner",deleteOneComment)