import { Request, Response } from "express";
import { List } from "./list.entity.js";
import { orm } from "../shared/db/orm.js";
import { ShowContent } from "../showContent/showContent.entity.js";
import {
  addOneContent,
  findOneContent,
} from "../showContent/showContent.controller.js";
const em = orm.em;

async function searchLists(req: Request, res: Response) {
  try {
    const query = req.query.nameList as string;

    if (typeof query === "string" && query.trim()) {
      // Buscar listas cuyo nombre contenga el valor de 'query'
      const lists = await em.find(
        List,
        {
          nameList: { $like: `%${query}%` }, // Esto es correcto
        },
        { populate: ["contents", "owner", "followers"] }
      );

      res.status(200).json({ message: "Lists found", data: lists });
    } else {
      res.status(400).json({ message: "Invalid query parameter" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function addContent(req: Request, res: Response) {
  try {
    const listId = Number.parseInt(req.params.idList);
    const content = await findOneContent(req, res);
    const list = await em.findOneOrFail(
      List,
      { id: listId },
      { populate: ["contents"] }
    );
    if (content != null) {
      if (list.contents.contains(content)) {
        return res.status(200).json({ message: "Content already in list" });
      } else {
        list.contents.add(content);
        await em.persistAndFlush(list);
        return res
          .status(200)
          .json({ message: "Content added to list", data: list });
      }
    } else {
      addOneContent(req, res);
      const content = (await findOneContent(req, res)) as ShowContent;
      list.contents.add(content);
      await em.persistAndFlush(list);
      return res
        .status(200)
        .json({ message: "New content added to list", data: list });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

async function findAll(req: Request, res: Response) {
  try {
    const lists = await em.find(
      List,
      {},
      { populate: ["contents", "owner", "followers"] }
    );
    res.status(200).json({ message: "found all lists", data: lists });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const list = await em.findOneOrFail(
      List,
      { id },
      { populate: ["contents", "owner", "followers"] }
    );
    res.status(200).json({ message: "list found", data: list });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function addOne(req: Request, res: Response) {
  try {
    const { contents, ...listData } = req.body;
    const list = em.create(List, listData);
    if (contents && contents.length > 0) {
      for (let i = 0; i < contents.length; i++) {
        const contentData = contents[i];
        const mockReq = {
          ...req,
          body: contentData,
        } as Request;
        let content = await findOneContent(mockReq, res);
        if (content == null) {
          await addOneContent(mockReq, res);
          content = await findOneContent(mockReq, res);
        }
        if (content) {
          list.contents.add(content);
          content.lists.add(list);
        }
      }
    }
    await em.persistAndFlush(list);
    res.status(201).json({ message: "List and contents created", data: list });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const list = em.getReference(List, id);
    await em.removeAndFlush(list);
    res.status(200).json({ message: "list deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function updateOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.idList);
    const listToUpdate = await em.findOneOrFail(
      List,
      { id },
      { populate: ["contents"] }
    );
    const contents = req.body.contents;
    if (contents && contents.length > 0) {
      listToUpdate.contents.removeAll();
      await em.persistAndFlush(listToUpdate);
      console.log("lista a borrar", listToUpdate);
      console.log("--------------------");
      for (const contentData of contents) {
        const mockReq = { ...req, body: contentData } as Request;
        let content = (await findOneContent(mockReq, res)) as ShowContent;
        console.log("el contenido que se devuelve es", content);
        if (!content) {
          await addOneContent(mockReq, res);
          content = (await findOneContent(mockReq, res)) as ShowContent;
        }
        if (content) {
          console.log("entroo nashe");
          listToUpdate.contents.add(content);
          await em.persistAndFlush(listToUpdate);
          console.log("lista modificada:", listToUpdate);
        } else {
        }
      }
    } else {
      console.log("No se proporcionaron contenidos en el body.");
    }
    em.assign(listToUpdate, {
      nameList: req.body.nameList,
      descriptionList: req.body.descriptionList,
    });
    em.flush();
    res.status(200).json({ message: "List updated", data: listToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  findAll,
  findOne,
  addOne,
  deleteOne,
  updateOne,
  searchLists,
  addContent,
};
