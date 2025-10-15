import express from "express";
import { 
  createLand, 
  deleteLand, 
  getActiveAuctions, 
  getLandById, 
  getLands, 
  updateLand 
} from "../controller/land.controller.js";

const router = express.Router();
router.get("/", getLands);
router.get("/active", getActiveAuctions);
router.get("/:id", getLandById);
router.post("/", createLand);
router.put("/:id", updateLand);
router.delete("/:id", deleteLand);

export default router;