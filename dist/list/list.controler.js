import { List } from "./list.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
/*function sanitizeListInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedInput ={
        name_list: req.body.name_list,
        contents: req.body.contents,
        user_id: req.body.user_id,
        new_name:req.body.new_name
    };

    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key]===undefined)
        delete req.body.sanitizedInput[key];
    });
    next();
};*/
async function findAll(req, res) {
    try {
        const lists = await em.find(List, {}, { populate: ['contents', 'owner', 'followers'] });
        res.status(200).json({ message: 'found all lists', data: lists });
    }
    catch (error) {
        res.status(200).json({ message: error.message });
    }
}
;
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const user = await em.findOneOrFail(List, { id }, { populate: ['contents', 'owner', 'followers'] });
        res.status(200).json({ message: 'list found', data: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
;
async function addOne(req, res) {
    try {
        const list = em.create(List, req.body); //sani
        await em.flush();
        res.status(201).json({ message: 'list created', data: list });
    }
    catch (error) {
        res.status(200).json({ message: error.message });
    }
}
;
function updateOne(req, res) {
    throw Error('Not implemented yet');
}
;
async function deleteOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const list = em.getReference(List, id);
        await em.removeAndFlush(list);
        res.status(200).json({ message: 'list delated' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
;
export { findAll, findOne, addOne, deleteOne, updateOne };
//# sourceMappingURL=list.controler.js.map