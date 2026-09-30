import { Router } from "express";
import {  login, signup } from "./auth.service.js";

export const authController = Router();

authController.post("/signup", async (req, res) => {
  try {
    const result = await signup(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({message : error.message});
  }
});

authController.post("/login", async (req, res) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({message : error.message});
  }
});