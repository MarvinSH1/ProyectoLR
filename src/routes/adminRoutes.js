//src/routes/adminRoutes.js
import express from "express";
import {
  getAdmins,
  editAdmin,
  addAdmin,
  deleteAdmin,
} from "../controller/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import verifyRole from "../middleware/verifyRolMiddleware.js";

const router = express.Router();

router.get("/admins", verifyToken, verifyRole("admin"), getAdmins);
router.put("/admin/:id", verifyToken, verifyRole("admin"), editAdmin);
router.delete(
  "/admin/deleteadmin/:id",
  verifyToken,
  verifyRole("admin"),
  deleteAdmin
);
router.post("/admin/add", verifyToken, verifyRole("admin"), addAdmin);

export default router;
