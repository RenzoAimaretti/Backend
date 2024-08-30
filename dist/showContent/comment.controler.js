import { User } from "../user/user.entity.js";
import { orm } from "../shared/db/orm.js";
import { Review } from "./review.entity.js";
import { findOneContent } from "./showContent.controler.js";
import { Comment } from "./comment.entity.js"; // Import the Comment entity
const em = orm.em;
async function addOneComment(req, res) {
    try {
        const reviewOwner = Number.parseInt(req.params.id);
        const showReviewd = await findOneContent(req, res);
        const review = await em.findOneOrFail(Review, { reviewOwner, showReviewd });
        const user = await em.findOneOrFail(User, { id: Number.parseInt(req.params.idCommentOwner) });
        const newComment = em.create(Comment, {
            commentOwner: user,
            comment: req.body.comment,
            commentReview: review
        });
        // Añadir el comentario a la reseña
        review.comments.add(newComment);
        // Persistir la reseña; el comentario se persistirá automáticamente debido a Cascade.ALL
        await em.persistAndFlush(review);
        res.status(200).json({ message: 'Comment created' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function getAllComments(req, res) {
    try {
        const reviewOwner = Number.parseInt(req.params.id);
        const showReviewd = await findOneContent(req, res);
        const review = await em.findOneOrFail(Review, { reviewOwner, showReviewd });
        const comments = await em.find(Comment, { commentReview: review }, { populate: ['commentOwner'] });
        res.status(200).json({ message: 'Comments found', data: comments });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function deleteOneComment(req, res) {
    try {
        const reviewOwner = Number.parseInt(req.params.id);
        const commentOwner = Number.parseInt(req.params.idCommentOwner);
        const showReviewd = await findOneContent(req, res);
        const commentReview = await em.findOneOrFail(Review, { reviewOwner, showReviewd });
        const comment = await em.findOneOrFail(Comment, { commentOwner, commentReview });
        em.removeAndFlush(comment);
        res.status(200).json({ message: 'Comment deleted', data: comment });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { addOneComment, getAllComments, deleteOneComment };
//# sourceMappingURL=comment.controler.js.map