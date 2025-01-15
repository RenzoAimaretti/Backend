import { orm } from "./orm.js";
import { User } from "../../user/user.entity.js";
import { RangoCinefilo } from "../../rangoCinefilo/rangoCinefilo.entity.js";
import { Subscription } from "../../subscription/subscription.entity.js";
import { Admin } from "../../admin/admin.entity.js";
import bcrypt from "bcrypt";
// Esta funcion es la encargada de inicializar la base de datos de ser necesario

export async function initDb() {
  // uso el fork de la ORM por que no necesito la instancia global del EM
  const em = orm.em.fork();
  const users = await em.find(User, {});
  const rangoCinefilos = await em.find(RangoCinefilo, {});
  const subscriptions = await em.find(Subscription, {});
  const admins = await em.find(Admin, {});

  if (rangoCinefilos.length === 0) {
    console.log("Rangos Cinefilos no encontrados, creando Rangos Cinefilos");
    const aficionado = em.create(RangoCinefilo, {
      nameRango: "Aficionado",
      descriptionRango: "Aficionado al cine",
    });
    await em.persistAndFlush(aficionado);
    const cineasta = em.create(RangoCinefilo, {
      nameRango: "Cineasta",
      descriptionRango: "Cineasta de culto",
    });
    em.persistAndFlush(cineasta);
  }

  if (subscriptions.length === 0) {
    console.log("Subscripciones no encontradas, creando Subscripciones");
    const basic = em.create(Subscription, {
      name: "Basica",
      cantidadSem: 2,
      precio: 110,
    });
    await em.persistAndFlush(basic);
    const premium = em.create(Subscription, {
      name: "Premium",
      cantidadSem: 7,
      precio: 1000,
    });
    await em.persistAndFlush(premium);
  }

  if (users.length === 0) {
    console.log("Usuarios no encontrados, creando Usuarios");
    const user1Password = await bcrypt.hash("12341234", 10);
    const user1 = em.create(User, {
      name: "cineFan123",
      //este mail corresponde a la cuenta 2 de mercadopago
      email: "test_user_1902302378@testuser.com",
      password: user1Password,
      rangoCinefilo: 1,
      subscription: 1,
      followingLists: [],
    });

    await em.persistAndFlush(user1);

    const user2Password = await bcrypt.hash("234ab734", 10);
    const user2 = em.create(User, {
      name: "cineFan456",
      email: "cinecine@gmail.com",
      password: user2Password,
      rangoCinefilo: 1,
      subscription: 2,
      followingLists: [],
    });
    await em.persistAndFlush(user2);
    const user3Password = await bcrypt.hash("CdnI29n1", 10);
    const user3 = em.create(User, {
      name: "cineFan789",
      email: "cinefanatico@gmail.com",
      password: user3Password,
      rangoCinefilo: 2,
      subscription: 1,
      followingLists: [],
    });

    await em.persistAndFlush(user3);
  }

  if (admins.length === 0) {
    console.log("Admins no encontrados, creando Admins");
    const adminPassword = await bcrypt.hash("adminroot", 10);
    const admin = em.create(Admin, {
      name: "MartinAdmin",
      email: "madmin@gmail.com",
      password: adminPassword,
      adminName: "Martin",
      adminStatus: true,
    });
    await em.persistAndFlush(admin);
  }
}
