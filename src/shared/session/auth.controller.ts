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
    console.log("paso por aca")
    const user = em.create(User,{
        name: name,
        email:email,
        password:password,
        rangoCinefilo: 1,
        followingLists: [],
        subscription: 1
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
            subscription:user.subscription},

            'clavesecreta-de-prueba-provisional-n$@#131238s91',

            {expiresIn:'1h'})

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge:1000*60*60
        }).send({message:'Successful login',data:userWithoutPassword,token});

    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

function logout(req: Request, res: Response) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
}

export { register, login, logout };

