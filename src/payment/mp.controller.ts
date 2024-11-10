import { Request, Response } from "express";
import { orm } from "../shared/db/orm";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { ngrokHost, ngrokHostBackend, vendToken } from "../../config";

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
      back_urls: {
        //hay que levantar estas urls con nrock por que mercado pago no acepta conexiones que no sean https!!!
        success: `${ngrokHost}/success`,
        failure: `${ngrokHost}/failure`,
        pending: `${ngrokHost}/pending`,
      },
      notify_url: `${ngrokHostBackend}/api/mp/webhook`,
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    //devolvemos la url de mercado pago
    res.json({ url: result.init_point });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al crear la preferencia de MP" });
  }
}

export async function webhook(req: Request, res: Response) {
  try {
    console.log(req.body);
    res.json({ message: "ok" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al procesar el webhook" });
  }
}
