import { orm } from "./orm.js";
import { User } from "../../user/user.entity.js";
import { RangoCinefilo } from "../../rangoCinefilo/rangoCinefilo.entity.js";
import { Subscription } from "../../subscription/subscription.entity.js";
import { Admin } from "../../admin/admin.entity.js";

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
    em.persist(aficionado);
    await em.flush();
    const cineasta = em.create(RangoCinefilo, {
      nameRango: "Cineasta",
      descriptionRango: "Cineasta de culto",
    });
    em.persist(cineasta);
    await em.flush();
  }

  if (subscriptions.length === 0) {
    console.log("Subscripciones no encontradas, creando Subscripciones");
    const basic = em.create(Subscription, { name: "Basica", cantidadSem: 2 });
    em.persist(basic);
    await em.flush();
    const premium = em.create(Subscription, {
      name: "Premium",
      cantidadSem: 7,
    });
    em.persist(premium);
    await em.flush();
  }
}
