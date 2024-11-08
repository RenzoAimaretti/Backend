import { Request, Response } from "express";
import { User } from "../user/user.entity.js";
import { orm } from "../shared/db/orm.js";
import { ShowContent } from "./showContent.entity.js";
import { Review } from "./review.entity.js";
import { findOneContent } from "./showContent.controller.js";
import { Comment } from "./comment.entity.js"; // Import the Comment entity

const em = orm.em;

async function addOneComment(req: Request, res: Response) {
  try {
    const reviewOwner = Number.parseInt(req.params.id);
    const showReviewd = (await findOneContent(req, res)) as ShowContent;
    const review = await em.findOneOrFail(Review, { reviewOwner, showReviewd });
    const user = await em.findOneOrFail(User, {
      id: Number.parseInt(req.params.idCommentOwner),
    });

    const newComment = em.create(Comment, {
      commentOwner: user,
      comment: req.body.comment,
      commentReview: review,
    });

    // Añadir el comentario a la reseña
    review.comments.add(newComment);

    // Persistir la reseña; el comentario se persistirá automáticamente debido a Cascade.ALL
    await em.persistAndFlush(review);

    res.status(200).json({ message: "Comment created" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllComments(req: Request, res: Response) {
  try {
    const reviewOwner = Number.parseInt(req.params.id);
    const showReviewd = (await findOneContent(req, res)) as ShowContent;
    const review = await em.findOneOrFail(Review, { reviewOwner, showReviewd });
    const comments = await em.find(
      Comment,
      { commentReview: review },
      { populate: ["commentOwner", "commentReview.reviewOwner"] }
    );
    res.status(200).json({ message: "Comments found", data: comments });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteOneComment(req: Request, res: Response) {
  try {
    const reviewOwner = Number.parseInt(req.params.id);
    const commentOwner = Number.parseInt(req.params.idCommentOwner);
    const showReviewd = (await findOneContent(req, res)) as ShowContent;
    const commentReview = await em.findOneOrFail(Review, {
      reviewOwner,
      showReviewd,
    });
    const comment = await em.findOneOrFail(Comment, {
      commentOwner,
      commentReview,
    });
    em.removeAndFlush(comment);
    res.status(200).json({ message: "Comment deleted", data: comment });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function editComment(req: Request, res: Response) {
  try {
    const reviewOwner = Number.parseInt(req.params.id);
    const commentOwner = Number.parseInt(req.params.idCommentOwner);
    const showReviewd = (await findOneContent(req, res)) as ShowContent;
    const commentReview = await em.findOneOrFail(Review, {
      reviewOwner,
      showReviewd,
    });
    const comment = await em.findOneOrFail(Comment, {
      commentOwner,
      commentReview,
    });
    comment.comment = req.body.comment;
    await em.persistAndFlush(comment);
    res.status(200).json({ message: "Comment edited", data: comment });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { addOneComment, getAllComments, deleteOneComment, editComment };
