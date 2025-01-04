import express from "express";

import authenticateAdmin from "../middlewares/authenticateAdmin.js";

import { getAllMeetings } from "../controllers/adminController.js";

const router = express.Router();

router.use(authenticateAdmin);

router.get("/meetings", getAllMeetings);

export default router;
