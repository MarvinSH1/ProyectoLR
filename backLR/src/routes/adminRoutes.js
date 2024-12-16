//src/routes/adminRoutes.js
import express from "express";
import { getAdmins, editAdmin } from "../controller/adminController.js";
const router = express.Router();

router.get("/admins", getAdmins);
router.put("/admin/:id", editAdmin);
export default router;
