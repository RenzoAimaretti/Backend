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
    throw Error('Not implemented yet');
}
;
function findOne(req, res) {
    throw Error('Not implemented yet');
}
;
function addOne(req, res) {
    throw Error('Not implemented yet');
}
;
function updateOne(req, res) {
    throw Error('Not implemented yet');
}
;
function deleteOne(req, res) {
    throw Error('Not implemented yet');
}
;
export { sanitizeListInput, findAll, findOne, addOne, deleteOne, updateOne };
//# sourceMappingURL=list.controler.js.map