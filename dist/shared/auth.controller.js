import bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { orm } from '../shared/db/orm';
const em = orm.em;
export async function register(req, res) {
    const { username, email, password } = req.body;
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = em.create(User, {
        name: username,
        email: email,
        password: hashedPassword,
        rangoCinefilo: 1,
        followingLists: [],
        subscription: 1
    });
    await em.persistAndFlush(user);
    res.status(201).json({ message: 'User registered successfully' });
}
export async function login(req, res) {
    const { email, password } = req.body;
    const user = await em.findOne(User, { email });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id; // Guardar userId en la sesión
        res.status(200).json({ message: 'Login successful' });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}
export function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
}
//# sourceMappingURL=auth.controller.js.map