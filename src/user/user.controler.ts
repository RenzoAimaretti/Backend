import { Request,Response,NextFunction } from "express";
import { User } from "./user.entity.js";
import { orm } from "../shared/db/orm.js";
import bcrypt from 'bcrypt';
import { error } from "console";
const em = orm.em
/*
async function sanitizeUserInput(req: Request , res: Response , next:NextFunction) {
    req.body.sanitizedInput = {
       name: req.body.name,
       password: req.body.password,
       email:req.body.email,
       friends: req.body.friends,
       list: req.body.list,
       firendFrom:req.body.firendFrom,
       rangoCinefilo:req.body.rangoCinefilo,
        followingList:req.body.followingList,
        subscription:req.body.subscription
       };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key];
        }
    });
    next(); 
};*/
async function findAll(req: Request,res: Response){
    try {
        const users = await em.find(User, {}, {populate:['rangoCinefilo','friends','friendsFrom','lists','followingLists','subscription']})
        res.status(200).json({message:'found all users',data:users})
    } catch (error:any){
        res.status(200).json({message: error.message})
    }
};

//consultar por id
async function findOne(req: Request,res: Response){
    try {
        const id = Number.parseInt(req.params.id)
        const user = await em.findOneOrFail(User, {id}, {populate:['rangoCinefilo','friends','friendsFrom','lists','followingLists','subscription']})
        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            rangoCinefilo: user.rangoCinefilo,
            subscription: user.subscription,
            friends: user.friends,
            friendsFrom: user.friendsFrom,
        };
        res.status(200).json({message:'user found',data:userWithoutPassword})
    } catch (error:any) {
        res.status(500).json({message: error.message})
    }
};

async function findOneDashboard(req: Request,res: Response){
    try {
        const id = Number.parseInt(req.body.userId)
        const user = await em.findOneOrFail(User, {id})
        return user.id
    } catch (error:any) {
        return error
    }
};


//añadir uno nuevo
//Se remplazo por el register del authController
// async function addOne(req: Request,res: Response){
//     try {
//         const user = em.create(User, req.body)//sani
//         await em.flush()
//         res.status(201).json({message:'user created', data:user})
//     } catch (error:any) {
//         res.status(200).json({message: error.message})
//     }    
// };

//modificar un character(put(idempotente), sin importar las veces que se ejecute el resultado ha de ser el mismo)
async function updateOne(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id);
        console.log('ID del usuario a actualizar:', id); // Log para verificar el ID

        const userToUpdate = await em.findOneOrFail(User, { id });
        console.log('Usuario antes de actualizar:', userToUpdate); // Log para verificar los datos del usuario antes de actualizar

        // Encripta la contraseña solo si se proporciona una nueva
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            console.log('Contraseña encriptada:', req.body.password); // Log para verificar la nueva contraseña encriptada
        }

        // Asigna solo los campos que existen y son válidos
        const updateData: Partial<User> = {};
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.password) updateData.password = req.body.password;

        console.log('Datos para actualizar:', updateData); // Log para verificar los datos que se van a actualizar

        em.assign(userToUpdate, updateData);
        await em.flush();

        console.log('Usuario después de actualizar:', userToUpdate); // Log para verificar los datos del usuario después de actualizar
        res.status(200).json({ message: 'user updated', data: userToUpdate });
    } catch (error: any) {
        console.error('Error actualizando el usuario:', error.message); // Log para errores
        res.status(500).json({ message: error.message });
    }
}
//borrar un character
async function deleteOne (req:Request,res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const user = em.getReference(User, id)
        await em.removeAndFlush(user)
        res.status(200).json({message:'user delated'})
    } catch (error:any) {
        res.status(500).json({message: error.message})
    }
};
async function searchUsers(req: Request, res: Response) {
    try {
        const query = req.query.name as string; // Nombre del parámetro de consulta

        if (typeof query === 'string' && query.trim()) {
            // Buscar usuarios cuyo nombre de usuario contenga el valor de 'query'
            const users = await em.find(User, {
                name: { $like: `%${query}%` } 
            });

            res.status(200).json({ message: 'Users found', data: users });
        } else {
            res.status(400).json({ message: 'Invalid query parameter' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function followUser(req:Request, res:Response){
    try{
        const userToFollowID=Number.parseInt(req.params.idF) 
        const userFollowerID=Number.parseInt(req.params.userId)
        if(userFollowerID===userToFollowID){
            throw new Error('No puedes seguirte a ti mismo')
        }else{
            const userToFollow=await em.findOneOrFail(User,{id:userToFollowID})
            const userFollower=await em.findOneOrFail(User,{id:userFollowerID})
            // Validar que el usuario no esté siguiendo al otro usuario
            const isAlreadyFollowing = await em.count(User, {
                id: userFollowerID,
                friendsFrom: { id: userToFollowID }
            });

            if (isAlreadyFollowing > 0) {
                throw new Error('Ya estás siguiendo a este usuario');
            }
            userToFollow.friends.add(userFollower)
            userFollower.friendsFrom.add(userToFollow)
            em.persist(userToFollow)
            em.persist(userFollower)
            await em.flush()
            res.status(201).json({message:'Seguido correctamente',data:{userToFollow,userFollower}})
        }
        
    }catch(error:any){
        res.status(500).json({message: error.message})
    }
}

export { findAll, findOne,findOneDashboard, updateOne, deleteOne,searchUsers, followUser}