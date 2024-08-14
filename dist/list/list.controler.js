import { List } from "./list.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
async function searchLists(req, res) {
    try {
        const query = req.query.nameList;
        if (typeof query === 'string' && query.trim()) {
            // Buscar listas cuyo nombre contenga el valor de 'query'
            const lists = await em.find(List, {
                nameList: { $like: `%${query}%` } // Esto es correcto
            }, { populate: ['contents', 'owner', 'followers'] });
            res.status(200).json({ message: 'Lists found', data: lists });
        }
        else {
            res.status(400).json({ message: 'Invalid query parameter' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findAll(req, res) {
    try {
        const lists = await em.find(List, {}, { populate: ['contents', 'owner', 'followers'] });
        res.status(200).json({ message: 'found all lists', data: lists });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const list = await em.findOneOrFail(List, { id }, { populate: ['contents', 'owner', 'followers'] });
        res.status(200).json({ message: 'list found', data: list });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function addOne(req, res) {
    try {
        const list = em.create(List, req.body); // sanitización pendiente
        await em.flush();
        res.status(201).json({ message: 'list created', data: list });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function deleteOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const list = em.getReference(List, id);
        await em.removeAndFlush(list);
        res.status(200).json({ message: 'list deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
function updateOne(req, res) {
    throw Error('Not implemented yet');
}
export { findAll, findOne, addOne, deleteOne, updateOne, searchLists };
//# sourceMappingURL=list.controler.js.map