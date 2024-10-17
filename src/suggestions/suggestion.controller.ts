import { Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Suggestion } from "./suggestion.entity.js";

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const suggestions = await em.find(Suggestion, {});
    res
      .status(200)
      .json({ message: "found all suggestions", data: suggestions });
  } catch (error: any) {
    res.status(200).json({ message: error.message });
  }
}

async function addOne(req: Request, res: Response) {
  try {
    const suggestion = em.create(Suggestion, req.body);
    await em.flush();
    res.status(201).json({ message: "suggestion created", data: suggestion });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const suggestion = await em.findOneOrFail(Suggestion, { id });
    res.status(200).json({ message: "suggestion found", data: suggestion });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function updateOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const suggestionToUpdate = await em.getReference(Suggestion, id);
    em.assign(suggestionToUpdate, req.body);
    await em.flush();
    res
      .status(200)
      .json({ message: "suggestion updated", data: suggestionToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const suggestion = await em.getReference(Suggestion, id);
    await em.removeAndFlush(suggestion);
    res.status(200).json({ message: "suggestion deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, addOne, updateOne, deleteOne };
