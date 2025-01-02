import express from "express";

import authenticateAdmin from "../middlewares/authenticateAdmin.js";

import { getAllMeetingsByAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.use(authenticateAdmin);

router.get("/meetings", getAllMeetingsByAdmin);

export default router;
