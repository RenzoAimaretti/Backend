import { Cinerange } from "./cinerange.entity.js"
import { Request,Response,NextFunction } from "express";
import { CinerangeRepository } from "./cinerange.repository.js";

const repository = new CinerangeRepository();

function sanitizeCinerangeInput(req: Request , res: Response , next:NextFunction) {
    req.body.sanitizedInput = {
       name_range: req.body.name_range,
       desc_range: req.body.desc_range,
       id_range: req.body.id_range,
       };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key];
        }
    });
    next(); 
};

function findAll(req:Request, res:Response){
    res.json({data: repository.findAll()});
};

function findOne(req:Request, res:Response){
    const idRequest = req.params.id;
    const cinerange = repository.findOne({id: idRequest});
    if(cinerange){
        return res.json({data:cinerange});
    }else{
        res.status(404).send('range not found');
    }
};

function add(req:Request, res:Response){
    const input = req.body.sanitizedInput;
    const newRange = new Cinerange(input.name_range, input.desc_range, input.id_range);
    const addedRange =repository.add(newRange);
    return res.status(201).send({Message: 'Range created', data: addedRange});
}

function updateOne(req: Request,res: Response){
    req.body.sanitizedInput.id_range=req.params.id_range;
    const updatedRange= repository.update(req.body.sanitizedInput);
    if(!updatedRange) {return res.status(404).send('Range not found')}
    else{return res.status(200).send({Message: 'Range updated', data: updatedRange});}    
};

function deleteOne (req:Request,res:Response){
    const deletedRange=repository.delete({id: req.params.id_range});
    if(!deletedRange) {return res.status(404).send('Range not found')}
    else{
        return res.status(200).send({Message: 'Range deleted', data: deletedRange}); 
    }
};
export {sanitizeCinerangeInput, findAll, findOne, add, updateOne, deleteOne}