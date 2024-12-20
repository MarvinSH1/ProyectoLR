// src/routes/RegistroRoutes.js
import express from "express";
import { registrar } from "../controller/RegistroController.js";

const router = express.Router();

router.post("/registro", registrar);

export default router;
