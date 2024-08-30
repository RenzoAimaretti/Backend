import { User } from "../user/user.entity.js";
import { orm } from "../shared/db/orm.js";
import { Review } from "./review.entity.js";
import { addOneContent, findOneContent } from "./showContent.controler.js";
const em = orm.em;
async function addOneReview(req, res) {
    try {
        const content = await findOneContent(req, res);
        const id = Number.parseInt(req.params.id);
        const user = await em.findOneOrFail(User, { id }, { populate: ['rangoCinefilo', 'friends', 'friendsFrom', 'lists', 'followingLists', 'subscription'] });
        if (content != null) {
            const newReview = em.create(Review, {
                rating: req.body.rating,
                description: req.body.description,
                reviewOwner: user.id,
                showReviewd: content,
                comments: [],
            });
            await em.persistAndFlush(newReview);
        }
        else {
            addOneContent(req, res);
            const content = await findOneContent(req, res);
            const newReview = em.create(Review, {
                rating: req.body.rating,
                description: req.body.description,
                reviewOwner: user.id,
                showReviewd: content,
                comments: [],
            });
            await em.persistAndFlush(newReview);
        }
        res.status(200).json({ message: 'Review created' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function deleteOneReview(req, res) {
    try {
        const reviewOwner = Number.parseInt(req.params.id);
        const showReviewd = await findOneContent(req, res);
        const review = await em.findOneOrFail(Review, { reviewOwner, showReviewd });
        em.removeAndFlush(review);
        res.status(200).json({ message: 'review deleted', data: review });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function getContentReviews(req, res) {
    try {
        const content = await findOneContent(req, res);
        const reviews = await em.find(Review, { showReviewd: content }, { populate: ['reviewOwner', 'comments'] });
        res.status(200).json({ message: 'Reviews found', data: reviews });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { addOneReview, deleteOneReview, getContentReviews };
//# sourceMappingURL=review.controler.js.map