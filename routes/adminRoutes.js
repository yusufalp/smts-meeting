import express from "express";

import { authorizeAdmin } from "../middlewares/authorizeRoles.js";

import { getAllMeetingsByAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.use(authorizeAdmin);

router.get("/meetings", getAllMeetingsByAdmin);

export default router;
