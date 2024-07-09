async function sanitizeUserInput(req, res, next) {
    next();
}
;
async function findAll(req, res) {
    throw Error('Not implemented yet');
}
;
//consultar por id
async function findOne(req, res) {
    throw Error('Not implemented yet');
}
;
//añadir uno nuevo
async function addOne(req, res) {
    throw Error('Not implemented yet');
}
;
//modificar un character(put(idempotente), sin importar las veces que se ejecute el resultado ha de ser el mismo)
async function updateOne(req, res) {
    throw Error('Not implemented yet');
}
;
//borrar un character
async function deleteOne(req, res) {
    throw Error('Not implemented yet');
}
;
export { sanitizeUserInput, findAll, findOne, addOne, updateOne, deleteOne };
//# sourceMappingURL=rangoCinefilo.controller.js.map