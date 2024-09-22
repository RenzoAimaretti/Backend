import { List } from "./list.entity.js";
import { orm } from "../shared/db/orm.js";
import { addOneContent, findOneContent } from "../showContent/showContent.controler.js";
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
async function addContent(req, res) {
    try {
        const listId = Number.parseInt(req.params.idList);
        const content = await findOneContent(req, res);
        const list = await em.findOneOrFail(List, { id: listId }, { populate: ['contents'] });
        if (content != null) {
            if (list.contents.contains(content)) {
                return res.status(200).json({ message: 'Content already in list' });
            }
            else {
                list.contents.add(content);
                await em.persistAndFlush(list);
                return res.status(200).json({ message: 'Content added to list', data: list });
            }
        }
        else {
            addOneContent(req, res);
            const content = await findOneContent(req, res);
            list.contents.add(content);
            await em.persistAndFlush(list);
            return res.status(200).json({ message: 'New content added to list', data: list });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
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
        const { contents, ...listData } = req.body;
        const list = em.create(List, listData);
        if (contents && contents.length > 0) {
            for (let i = 0; i < contents.length; i++) {
                const contentData = contents[i];
                const mockReq = {
                    ...req,
                    body: contentData
                };
                let content = await findOneContent(mockReq, res);
                if (content == null) {
                    await addOneContent(mockReq, res);
                    content = await findOneContent(mockReq, res);
                }
                if (content) {
                    list.contents.add(content);
                    content.lists.add(list);
                }
            }
        }
        await em.persistAndFlush(list);
        res.status(201).json({ message: 'List and contents created', data: list });
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
    try {
        const id = Number.parseInt(req.params.idList);
        const listToUpdate = em.getReference(List, id);
        em.assign(listToUpdate, req.body);
        em.flush();
        res.status(200).json({ message: 'list updated', data: listToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    ;
}
export { findAll, findOne, addOne, deleteOne, updateOne, searchLists, addContent };
//# sourceMappingURL=list.controler.js.map