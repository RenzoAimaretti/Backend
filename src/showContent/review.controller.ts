import { Request, Response, NextFunction } from "express";
import { User } from "../user/user.entity.js";
import { orm } from "../shared/db/orm.js";
import { ShowContent } from "./showContent.entity.js";
import { Review } from "./review.entity.js";
import { addOneContent, findOneContent } from "./showContent.controller.js";

const em = orm.em;

async function addOneReview(req: Request, res: Response) {
  try {
    const content = await findOneContent(req, res);
    const id = Number.parseInt(req.params.id);
    const user = await em.findOneOrFail(
      User,
      { id },
      {
        populate: [
          "rangoCinefilo",
          "friends",
          "friendsFrom",
          "lists",
          "followingLists",
          "subscription",
        ],
      }
    );

    if (content != null) {
      const newReview = em.create(Review, {
        rating: req.body.rating,
        description: req.body.description,
        reviewOwner: user.id,
        showReviewd: content,
        comments: [],
      });
      await em.persistAndFlush(newReview);
    } else {
      addOneContent(req, res);
      const content = (await findOneContent(req, res)) as ShowContent;
      const newReview = em.create(Review, {
        rating: req.body.rating,
        description: req.body.description,
        reviewOwner: user.id,
        showReviewd: content,
        comments: [],
      });
      await em.persistAndFlush(newReview);
    }
    res.status(200).json({ message: "Review created" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteOneReview(req: Request, res: Response) {
  try {
    const reviewOwner = Number.parseInt(req.params.id);
    const showReviewd = (await findOneContent(req, res)) as ShowContent;
    const review = await em.findOneOrFail(
      Review,
      { reviewOwner, showReviewd },
      { populate: ["comments"] }
    );
    em.removeAndFlush(review);
    res.status(200).json({ message: "review deleted", data: review });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getContentReviews(req: Request, res: Response) {
  try {
    const content = await findOneContent(req, res);
    const reviews = await em.find(
      Review,
      { showReviewd: content },
      { populate: ["reviewOwner", "comments.commentReview.reviewOwner"] }
    );
    res.status(200).json({ message: "Reviews found", data: reviews });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function editReview(req: Request, res: Response) {
  try {
    const reviewOwner = Number.parseInt(req.params.id);
    const showReviewd = (await findOneContent(req, res)) as ShowContent;
    const review = await em.findOneOrFail(Review, { reviewOwner, showReviewd });
    review.rating = req.body.rating;
    review.description = req.body.description;
    await em.flush();
    res.status(200).json({ message: "review edited", data: review });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
export { addOneReview, deleteOneReview, getContentReviews, editReview };
