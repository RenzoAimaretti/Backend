import { Request, Response } from "express";
import { Admin } from "./admin.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const admins = await em.find(Admin, {});
    res.status(200).json({ message: "found all admins", data: admins });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const admin = await em.findOneOrFail(Admin, { id });
    res.status(200).json(admin);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOneAdminDashboard(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.body.userId);
    const admin = await em.findOneOrFail(Admin, { id });
    return admin.id;
  } catch (error: any) {
    return error;
  }
}
// se hace desde register el addOne
// async function addOne(req: Request, res: Response) {
//   try {
//     const admin = em.create(Admin, req.body);
//     admin.adminStatus = true;
//     // sanitización pendiente
//     await em.flush();
//     res.status(201).json({ message: "admin created", data: admin });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// }

async function updateOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const admin = await em.findOneOrFail(Admin, { id });
    em.assign(admin, req.body); // sanitización pendiente
    await em.flush();
    res.status(200).json({ message: "admin updated", data: admin });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const admin = em.getReference(Admin, id);
    em.remove(admin);
    await em.flush();
    res.status(200).json({ message: "admin deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, updateOne, deleteOne, findOneAdminDashboard };
