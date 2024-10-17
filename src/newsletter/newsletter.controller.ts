import { orm } from "../shared/db/orm.js";
import { Newsletter } from "./newsletter.entity.js";
import { Request, Response } from "express";

const em = orm.em;

async function getAllSuscribers(req: Request, res: Response) {
  try {
    const newsletters = await em.find(Newsletter, {});
    res.status(200).json({ message: "Newsletters found", data: newsletters });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getOneSuscriber(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const newsletter = await em.findOneOrFail(Newsletter, { id });
    res.status(200).json({ message: "Newsletter found", data: newsletter });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function addSuscriber(req: Request, res: Response) {
  try {
    req.body.activo = true;
    const newsletter = em.create(Newsletter, req.body);
    await em.flush();
    res.status(201).json({ message: "Newsletter created", data: newsletter });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteSuscriber(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const newsletter = em.getReference(Newsletter, id);
    em.remove(newsletter);
    await em.flush();
    res.status(200).json({ message: "Newsletter deleted", data: newsletter });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function updateSuscriber(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const newsletter = await em.findOneOrFail(Newsletter, { id });
    em.assign(newsletter, req.body);
    await em.flush();
    res.status(200).json({ message: "Newsletter updated", data: newsletter });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  getAllSuscribers,
  addSuscriber,
  deleteSuscriber,
  updateSuscriber,
  getOneSuscriber,
};
