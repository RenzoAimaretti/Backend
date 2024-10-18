import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../user/user.entity.js';
import { orm } from '../db/orm.js';
import jwt from 'jsonwebtoken';
const em = orm.em;

async function register(req: Request, res: Response) {
    const userExists = await em.findOne(User, { email: req.body.email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const {name, email} = req.body;

    // Hashear la contraseña
    const password= await bcrypt.hash(req.body.password, 10);
    const user = em.create(User,{
        name: name,
        email:email,
        password:password,
        rangoCinefilo: 1,
        followingLists: [],
        subscription: 1,
        isAdmin:false 
    });

    await em.persistAndFlush(user);

    res.status(201).json({ message: 'User registered successfully' });
}

async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await em.findOne(User, { email });
    if (user && await bcrypt.compare(password, user.password)) {
        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            rangoCinefilo: user.rangoCinefilo,
            subscription: user.subscription
        };
        const token = jwt.sign(
            {id:user.id,
            name:user.name,
            email:user.email,
            rangoCinefilo:user.rangoCinefilo,
            subscription:user.subscription,
            isAdmin: user.isAdmin },

            'clavesecreta-de-prueba-provisional-n$@#131238s91',

            {expiresIn:'1h'})

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge:1000*60*60,
            path:'/'
        }).send({message:'Successful login',data:userWithoutPassword,token});

    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

function logout(req: Request, res: Response) {
    res.clearCookie('access_token', {
    path: '/',
    sameSite: 'none', 
    secure: false
});
}

export { register, login, logout };

