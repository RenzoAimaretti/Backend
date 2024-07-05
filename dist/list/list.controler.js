import { ListRepository } from "./list.repository.js";
import { UserRepository } from "../user/user.repository.js";
import { List } from "./list.entity.js";
const repository = new ListRepository();
const userRepository = new UserRepository();
function sanitizeListInput(req, res, next) {
    req.body.sanitizedInput = {
        name_list: req.body.name_list,
        contents: req.body.contents,
        user_id: req.body.user_id,
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined)
            delete req.body.sanitizedInput[key];
    });
    next();
}
;
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
;
function findOne(req, res) {
    const idRequest = req.params.user_id;
    const name_listRequest = req.params.name_list;
    const list = repository.findOne({ id: idRequest, attrs: name_listRequest });
    if (list) {
        return res.json({ data: list });
    }
    else {
        res.status(404).send('list not found');
    }
}
;
function addOne(req, res) {
    const input = req.body.sanitizedInput;
    const newList = new List(input.name_list, input.contents, input.user_id);
    const addedList = repository.add(newList);
    const owner = userRepository.findOne({ id: newList.user_id });
    console.log(owner);
    if (!owner) {
        return res.status(404).send("User not found");
    }
    else {
        owner.list.push(newList);
        userRepository.update(owner);
    }
    return res.status(201).send({ Message: "List created", data: addedList });
}
;
function updateOne(req, res) {
    req.body.sanitizedInput.id = req.params.owner;
    const updatedList = repository.update(req.body.sanitizedInput);
    if (!updatedList) {
        return res.status(404).send("List not found");
    }
    else {
        return res.status(200).send({ Message: "List updated", data: updatedList });
    }
}
;
function deleteOne(req, res) {
    const deletedList = repository.delete({ id: req.params.owner, attrs: req.params.name_list });
    if (!deletedList) {
        return res.status(404).send("List not found");
    }
    else {
        const owner = userRepository.findOne({ id: deletedList.user_id });
        if (owner) {
            const index = owner.list.findIndex(list => list.name_list === deletedList.name_list);
            if (index != -1) {
                owner.list.splice(index, 1);
            }
            userRepository.update(owner);
            return res.status(200).send({ Messaeg: "List deleted", data: deletedList });
        }
    }
}
;
export { sanitizeListInput, findAll, findOne, addOne, updateOne, deleteOne };
//# sourceMappingURL=list.controler.js.map