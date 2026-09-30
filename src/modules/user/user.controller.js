import { Router } from "express";
import { deleteUser, getUser, update } from "./user.service.js";

export const userController = Router();

userController.patch("/:id", async (req, res) => {
  try {
    const result = await update(req.params.id , req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({message : error.message});
  }
});

userController.delete("/:id", async (req, res) => {
  try {
    const result = await deleteUser(req.params.id , req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({message : error.message});
  }
});

userController.get("/:id", async (req, res) => {
  try {
    const result = await getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({message : error.message});
  }
});