import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNote,
  getNoteWithUser,
  getNoteWithUserAggregate,
  pagination,
  replaceNote,
  updateNote,
  updateTitle,
} from "./note.service.js";

export const noteController = Router();

noteController.post("/:id", async (req, res) => {
  try {
    const result = await createNote(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

noteController.patch("/:userId", async (req, res) => {
  try {
    const result = await updateNote(req.params.userId, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

noteController.put("/replace/:userId/:noteId", async (req, res) => {
  try {
    const result = await replaceNote(
      req.params.userId,
      req.params.noteId,
      req.body,
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

noteController.patch("/all/:userId", async (req, res) => {
  try {
    const result = await updateTitle(req.params.userId, req.body.title);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

noteController.delete("/:userId/:noteId", async (req, res) => {
  try {
    const result = await deleteNote(req.params.userId, req.params.noteId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

noteController.get("/paginate-sort/:userId", async (req, res) => {
  try {
    const result = await pagination(
      req.params.userId,
      req.query.page,
      req.query.limit,
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

noteController.get("/findNote/:userId/:noteId", async (req, res) => {
  try {
    const result = await getNote(
      req.params.userId,
      req.params.noteId
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

noteController.get("/note-with-user", async (req, res) => {
  try {
    const result = await getNoteWithUser();
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

noteController.get("/aggregate/:userId", async (req, res) => {
  try {
    const result = await getNoteWithUserAggregate(req.query.searchTitle  ,req.params.userId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});