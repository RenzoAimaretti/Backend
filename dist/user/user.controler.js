import { User } from "./user.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
/*
async function sanitizeUserInput(req: Request , res: Response , next:NextFunction) {
    req.body.sanitizedInput = {
       name: req.body.name,
       password: req.body.password,
       email:req.body.email,
       friends: req.body.friends,
       list: req.body.list,
       firendFrom:req.body.firendFrom,
       rangoCinefilo:req.body.rangoCinefilo,
        followingList:req.body.followingList,
        subscription:req.body.subscription
       };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key];
        }
    });
    next();
};*/
async function findAll(req, res) {
    try {
        const users = await em.find(User, {}, { populate: ['rangoCinefilo', 'friends', 'friendsFrom', 'lists', 'followingLists', 'subscription'] });
        res.status(200).json({ message: 'found all users', data: users });
    }
    catch (error) {
        res.status(200).json({ message: error.message });
    }
}
;
//consultar por id
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const user = await em.findOneOrFail(User, { id }, { populate: ['rangoCinefilo', 'friends', 'friendsFrom', 'lists', 'followingLists', 'subscription'] });
        res.status(200).json({ message: 'user found', data: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
;
//añadir uno nuevo
async function addOne(req, res) {
    try {
        const user = em.create(User, req.body); //sani
        await em.flush();
        res.status(201).json({ message: 'user created', data: user });
    }
    catch (error) {
        res.status(200).json({ message: error.message });
    }
}
;
//modificar un character(put(idempotente), sin importar las veces que se ejecute el resultado ha de ser el mismo)
async function updateOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const userToUpdate = await em.findOneOrFail(User, { id });
        em.assign(userToUpdate, req.body); //sani
        await em.flush();
        res.status(200).json({ message: 'user updated', data: userToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//borrar un character
async function deleteOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const user = em.getReference(User, id);
        await em.removeAndFlush(user);
        res.status(200).json({ message: 'user delated' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
;
export { findAll, findOne, addOne, updateOne, deleteOne };
//# sourceMappingURL=user.controler.js.map