import { Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { MercadoPagoConfig, Preference } from "mercadopago";
import {
  clientSecretVend,
  ngrokHost,
  ngrokHostBackend,
  vendToken,
} from "../../config.js";
import crypto from "crypto";
import { User } from "../user/user.entity.js";
import { Subscription } from "../subscription/subscription.entity.js";
const client = new MercadoPagoConfig({
  accessToken: vendToken,
});
const em = orm.em;

export async function createPreference(req: Request, res: Response) {
  try {
    console.log(req.body);
    const body = {
      items: [
        {
          id: req.body.id,
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.unit_price),
          currency: "ARS",
        },
      ],
      back_urls: {
        //hay que levantar estas urls con nrock por que mercado pago no acepta conexiones que no sean https!!!
        success: `${ngrokHost}`,
        failure: `${ngrokHost}`,
        pending: `${ngrokHost}`,
      },

      //por alguna razon, desde la pagina de pruebas de mp, funciona el webhook pero no desde el codigo, no se si es por el ngrok o que
      notification_url: `${ngrokHostBackend}/api/mp/webhook`,
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    console.log(result.payer);
    console.log(result.id);
    //devolvemos la url de mercado pago
    res.json({ url: result.init_point });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al crear la preferencia de MP" });
  }
}

export async function webhook(req: Request, res: Response) {
  try {
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    //id de la compra
    const dataID = urlParams.get("data.id");
    //obtenemos la info de la compra con el id a la api de MP
    const payment = await fetch(
      `https://api.mercadopago.com/v1/payments/${dataID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${client.accessToken}`,
        },
      }
    );
    //console.log(payment);
    if (payment.ok) {
      const paymentData = await payment.json();
      const payerData = paymentData.payer;
      const status = paymentData.status;
      const product = paymentData.description;
      const paymentId = paymentData.id;
      //podria usar la paymenId para guardar los cobros en la bd quizas
      const payerUser = await em.findOneOrFail(User, {
        email: payerData.email,
      });

      if (payerUser.email === payerData.email && status === "approved") {
        //si esta aprobado y esta registrado en la db busco su subscripcion nueva y la actualizo
        console.log(payerUser);
        console.log("Usuario encontrado");
        const newSubscription = await em.findOneOrFail(Subscription, {
          name: product,
        });
        console.log(newSubscription);
        //actualizo la subscripcion del usuario
        payerUser.subscription = newSubscription;
        console.log(payerUser);
        await em.persistAndFlush(payerUser);
      }
    }
    res.status(201).json({ message: "Webhook validado y recibido" });
  } catch (e) {
    console.error("Error al procesar el webhook:", e);
    res.status(500).json({ message: "Error al procesar el webhook" });
  }
}
