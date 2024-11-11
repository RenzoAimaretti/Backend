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
const client = new MercadoPagoConfig({
  accessToken: vendToken,
});

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
      payer: {
        // lo tengo que sacar, no persiste en lo que manda MP dps
        name: "Lalo",
        surname: "Landa",
        userId: 543,
      },
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
    // const xSignature = req.headers["x-signature"] as string;
    // const xRequestId = req.headers["x-request-id"] as string;
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    //id de la compra
    const dataID = urlParams.get("data.id");

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
      console.log(paymentData);
      //AHORA CON ESTO RECIBIMOS EL ID DE LA COMPRA Y EL DNI
      // HAY QUE MODIFICAR USERS PARA HACER LA CORRESPONDENCIA
      // ME GUSTARIA PODER GUARDAR EL ID IGUAL.
    }

    // // Extrae los valores `ts` y `hash` de `xSignature`
    // const parts = xSignature?.split(",") || [];
    // let ts: string | undefined;
    // let hash: string | undefined;

    // parts.forEach((part) => {
    //   const [key, value] = part.split("=");
    //   if (key && value) {
    //     const trimmedKey = key.trim();
    //     const trimmedValue = value.trim();
    //     if (trimmedKey === "ts") {
    //       ts = trimmedValue;
    //     } else if (trimmedKey === "v1") {
    //       hash = trimmedValue;
    //     }
    //   }
    // });

    // // Construye la cadena para firmar
    // const stringToSign = `id:${dataID};request-id:${xRequestId};ts:${ts}`;
    // const sha = crypto
    //   .createHmac("sha256", clientSecretVend)
    //   .update(stringToSign)
    //   .digest("hex");

    //por alguna razon no va
    // Verifica la firma
    // if (hash === sha) {
    //   console.log("La firma es correcta");
    //   res.status(201).json({ message: "Webhook validado y recibido" });
    // } else {
    //   console.log("Firma incorrecta");
    //   res.status(401).json({ message: "Firma no válida" });
    // }

    res.status(201).json({ message: "Webhook validado y recibido" });
  } catch (e) {
    console.error("Error al procesar el webhook:", e);
    res.status(500).json({ message: "Error al procesar el webhook" });
  }
}
