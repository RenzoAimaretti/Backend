import { Request, Response } from "express";
import { orm } from "../shared/db/orm";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-4816688256672306-110910-4fe7871da528646dcbe47b7f51eb5cfd-2088245358",
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
        success:
          "https://40ba-2803-9800-98c0-83a3-95ae-b4d9-30a-80e6.ngrok-free.app",
        failure:
          "https://40ba-2803-9800-98c0-83a3-95ae-b4d9-30a-80e6.ngrok-free.app",
        pending:
          "https://40ba-2803-9800-98c0-83a3-95ae-b4d9-30a-80e6.ngrok-free.app",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al crear la preferencia de MP" });
  }
}
