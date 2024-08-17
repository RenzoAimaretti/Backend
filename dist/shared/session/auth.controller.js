import bcrypt from 'bcrypt';
import { User } from '../../user/user.entity.js';
import { orm } from '../db/orm.js';
const em = orm.em;
async function register(req, res) {
    const userExists = await em.findOne(User, { email: req.body.email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const { name, email } = req.body;
    // Hashear la contraseña
    const password = await bcrypt.hash(req.body.password, 10);
    console.log("paso por aca");
    const user = em.create(User, {
        name: name,
        email: email,
        password: password,
        rangoCinefilo: 1,
        followingLists: [],
        subscription: 1
    });
    await em.persistAndFlush(user);
    res.status(201).json({ message: 'User registered successfully' });
}
async function login(req, res) {
    const { email, password } = req.body;
    const user = await em.findOne(User, { email });
    console.log(user);
    console.log(password);
    console.log(user?.password);
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id; // Guardar userId en la sesión
        res.status(200).json({ message: 'Login successful', data: user });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}
function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
}
export { register, login, logout };
//# sourceMappingURL=auth.controller.js.map