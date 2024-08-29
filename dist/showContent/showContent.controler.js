import { orm } from "../shared/db/orm.js";
import { ShowContent } from "./showContent.entity.js";
const em = orm.em;
async function findOneContent(req, res) {
    try {
        const idContent = Number.parseInt(req.params.idContent);
        const showContent = await em.findOneOrFail(ShowContent, { idContent }, { populate: ['lists'] });
        return showContent;
    }
    catch (error) {
        return null;
    }
}
async function addOneContent(req, res) {
    try {
        const showContent = new ShowContent();
        showContent.idContent = Number.parseInt(req.params.idContent);
        showContent.nameContent = req.body.nameContent;
        await em.persistAndFlush(showContent);
    }
    catch (error) {
    }
}
async function updateOneContent(req, res) {
    try {
        const idContent = Number.parseInt(req.params.idContent);
        const showContent = await em.findOneOrFail(ShowContent, { idContent });
        showContent.nameContent = req.body.nameContent;
        await em.persistAndFlush(showContent);
        res.status(200).json({ message: 'showContent updated', data: showContent });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function deleteOneContent(req, res) {
    try {
        const idContent = Number.parseInt(req.params.id);
        const showContent = await em.findOneOrFail(ShowContent, { idContent });
        em.removeAndFlush(showContent);
        res.status(200).json({ message: 'showContent deleted', data: showContent });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { findOneContent, addOneContent, updateOneContent, deleteOneContent };
//# sourceMappingURL=showContent.controler.js.map