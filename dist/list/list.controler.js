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
        new_name: req.body.new_name
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
    const id = req.params.user_id;
    const name_list = req.params.name_list;
    const owner = userRepository.findOne({ id: id });
    if (owner === undefined) {
        return res.status(404).send("User not found");
    }
    else {
        const list = owner.list.find((list) => list.name_list === name_list);
        if (list === undefined) {
            return res.status(404).send("List not found");
        }
        else {
            return res.status(200).send({ Message: "List found", data: list });
        }
    }
    ;
}
;
function addOne(req, res) {
    const id = req.params.user_id;
    const input = req.body.sanitizedInput;
    const owner = userRepository.findOne({ id: id });
    console.log(owner);
    if (!owner) {
        return res.status(404).send("User not found");
    }
    else {
        input.user_id = id;
        const newList = new List(input.name_list, input.contents, input.user_id);
        const addedList = repository.add(newList);
        owner.list.push(newList);
        userRepository.update(owner);
        return res.status(201).send({ Message: "List created", data: addedList });
    }
}
;
function updateOne(req, res) {
    const id = req.params.user_id;
    const owner = userRepository.findOne({ id: id });
    if (!owner) {
        return res.status(404).send("User not found");
    }
    else {
        const input = req.body.sanitizedInput;
        input.user_id = id;
        let new_name = req.body.new_name;
        if (new_name === "") {
            new_name = input.name_list;
        }
        const updatedList = repository.update(input, new_name);
        if (!updatedList) {
            return res.status(404).send("List not found");
        }
        else {
            return res.status(200).send({ Message: "List updated", data: updatedList });
        }
    }
}
;
function deleteOne(req, res) {
    const id = req.params.user_id;
    const owner = userRepository.findOne({ id: id });
    if (!owner) {
        return res.status(404).send("User not found");
    }
    else {
        const deletedList = repository.delete({ id: id, attrs: req.params.name_list });
        if (!deletedList) {
            return res.status(404).send("List not found");
        }
        else {
            const index = owner.list.findIndex(item => item === deletedList);
            if (index !== -1) {
                owner.list.splice(index, 1);
            }
            return res.status(200).send({ Message: "List deleted", data: deletedList });
        }
    }
}
;
export { sanitizeListInput, findAll, findOne, addOne, deleteOne, updateOne };
//# sourceMappingURL=list.controler.js.map