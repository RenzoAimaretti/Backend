import { UserRepository } from "./user.repository.js";
import { User } from "./user.entity.js";
const repository = new UserRepository();
function sanitizeUserInput(req, res, next) {
    req.body.sanitizedInput = {
        name: req.body.name,
        password: req.body.password,
        friends: req.body.friends,
        list: req.body.list,
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
;
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
;
//consultar por id
function findOne(req, res) {
    const idRequest = req.params.id;
    const user = repository.findOne({ id: idRequest });
    if (user) {
        return res.json({ data: user });
    }
    else {
        res.status(404).send('user not found');
    }
}
;
//añadir uno nuevo
function addOne(req, res) {
    const input = req.body.sanitizedInput;
    const newUser = new User(input.name, input.password, input.friends, input.list);
    const addedUser = repository.add(newUser);
    return res.status(201).send({ Message: 'User created', data: addedUser });
}
;
//modificar un character(put(idempotente), sin importar las veces que se ejecute el resultado ha de ser el mismo)
function updateOne(req, res) {
    req.body.sanitizedInput.id = req.params.id;
    const updatedUser = repository.update(req.body.sanitizedInput);
    if (!updatedUser) {
        return res.status(404).send('Character not found');
    }
    else {
        return res.status(200).send({ Message: 'User updated', data: updatedUser });
    }
}
;
//borrar un character
function deleteOne(req, res) {
    const deletedUser = repository.delete({ id: req.params.id });
    if (!deletedUser) {
        return res.status(404).send('User not found');
    }
    else {
        return res.status(200).send({ Message: 'User deleted', data: deletedUser });
    }
}
;
export { sanitizeUserInput, findAll, findOne, addOne, updateOne, deleteOne };
//# sourceMappingURL=user.controler.js.map