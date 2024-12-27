// src/routes/repartidorRoutes.js
import express from "express";
import {
  addRepartidor,
  deleteRepartidor,
  editRepartidor,
  getRepartidores,
} from "../controller/repartidorController.js";

const router = express.Router();

router.post("/add", addRepartidor);
router.get("/getrepartidor", getRepartidores);
router.put("/:idrepartidor/:id", editRepartidor);
router.delete("/deleterepartidor/:id", deleteRepartidor);

export default router;
