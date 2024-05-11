import { Request,Response,NextFunction } from "express";
import { UserRepository } from "./user.repository.js";
import { Usuario } from "./user.entity.js";

const repository = new UserRepository

function sanitizeUserInput(req: Request , res: Response , next:NextFunction) {
    req.body.sanitizedInput = {
       nombre: req.body.nombre,
       contraseña: req.body.contraseña,
       amigos: req.body.amigos,
       listas: req.body.listas,
       };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key];
        }
    }); 
};
function findAll(req: Request,res: Response){
res.json({data: repository.findAll()});
};

//consultar por id
function findOne(req: Request,res: Response){
    const idRequest = req.params.id;
    const user = repository.findOne({id: idRequest});
    if(user){
        return res.json({data:user});
    }else{
        res.status(404).send('user not found');
    }
};

//añadir uno nuevo
function addOne(req: Request,res: Response){
    const input = req.body.sanitizedInput;
    const newUser = new Usuario(input.name, input.contraseña, input.amigos,input.listas);
    const addedUser =repository.add(newUser);
    return res.status(201).send({Message: 'User created', data: addedUser});
};

//modificar un character(put(idempotente), sin importar las veces que se ejecute el resultado ha de ser el mismo)
function updateOne(req: Request,res: Response){
    req.body.sanitizedInput.id=req.params.id;
    const updatedUser= repository.update(req.body.sanitizedInput);
    if(!updatedUser) {return res.status(404).send('Character not found')}
    else{return res.status(200).send({Message: 'User updated', data: updatedUser});}
    
};

//borrar un character
function deleteOne (req:Request,res:Response){
    const deletedUser=repository.delete({id: req.params.id});
    if(!deletedUser) {return res.status(404).send('User not found')}
    else{
        return res.status(200).send({Message: 'User deleted', data: deletedUser}); 
    }
};
export {sanitizeUserInput, findAll, findOne, addOne, updateOne, deleteOne}