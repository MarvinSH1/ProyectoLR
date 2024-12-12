//backLR/src/Routes/adminRoutes.js
import Router from "express";
import express from "express";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/user", getUsers);

export default router;
