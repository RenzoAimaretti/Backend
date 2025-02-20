import { Request, Response, NextFunction } from "express";
import { User } from "../user/user.entity.js";
import { orm } from "../shared/db/orm.js";
import { ShowContent } from "./showContent.entity.js";
import { Review } from "./review.entity.js";
import { addOneContent, findOneContent } from "./showContent.controller.js";
import { perspectiveAnalisys } from "../shared/perspective.controller.js";
import { RangoCinefilo } from "../rangoCinefilo/rangoCinefilo.entity.js";
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

    const toxicityScore = await perspectiveAnalisys.analyzeText(
      req.body.description
    );
    if (toxicityScore == null) {
      return res.status(500).json({ message: "Error with Perspective API" });
    }
    if (toxicityScore > 0.7) {
      return res.status(200).json({ message: "Toxicity detected" });
    } else {
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
    }
    const reviewsCount = await em.count(Review, { reviewOwner: user.id });
    const newRangoCinefilo = await em.findOne(
      RangoCinefilo,
      {
        minReviews: { $lte: reviewsCount },
      },
      { orderBy: { minReviews: "DESC" } }
    );

    let rangoChanged = false;
    if (newRangoCinefilo && user.rangoCinefilo.id !== newRangoCinefilo.id) {
      user.rangoCinefilo = newRangoCinefilo;
      await em.persistAndFlush(user);
      rangoChanged = true;
    }

    res.status(200).json({
      message: "Review created",
      rangoChanged,
      newRango: newRangoCinefilo ? newRangoCinefilo.nameRango : null,
    });
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
    const toxicityScore = await perspectiveAnalisys.analyzeText(
      req.body.description
    );
    if (toxicityScore == null) {
      res.status(500).json({ message: "error with perspective api" });
      return;
    }
    if (toxicityScore > 0.7) {
      res.status(200).json({ message: "Toxicity detected" });
      return;
    } else {
      review.rating = req.body.rating;
      review.description = req.body.description;
      await em.flush();
    }
    res.status(200).json({ message: "review edited", data: review });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
export { addOneReview, deleteOneReview, getContentReviews, editReview };
