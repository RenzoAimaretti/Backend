import { CinerangeRepository } from "./cinerange.repository.js";
const repository = new CinerangeRepository();
function sanitizeCinerangeInput(req, res, next) {
    req.body.sanitizedInput = {
        name_range: req.body.name_range,
        desc_range: req.body.desc_range,
        id_range: req.body.id_range,
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
function findOne(req, res) {
    const idRequest = req.params.id;
    const cinerange = repository.findOne({ id: idRequest });
    if (cinerange) {
        return res.json({ data: cinerange });
    }
    else {
        res.status(404).send('range not found');
    }
}
export { sanitizeCinerangeInput, findAll };
//# sourceMappingURL=cinerange.controler.js.map