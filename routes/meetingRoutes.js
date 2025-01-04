import express from "express";

import {
  createMeeting,
  deleteMeeting,
  getMeetingById,
  getMeetings,
  updateMeeting,
} from "../controllers/meetingController.js";

const router = express.Router();

// POST /api/meetings
// Create a new meeting.
router.post("/", createMeeting);

// DELETE /api/meetings/:id
// Cancel or delete a meeting.
router.delete("/meetings/:id", deleteMeeting);

// GET /api/meetings
// Retrieves all meetings.
router.get("/", getMeetings);

// GET /api/meetings/:id
// Retrieve details for a specific meeting.
router.get("/:_id", getMeetingById);

// PATCH /api/meetings/:id
// Update meeting details (e.g., time, participants).
router.patch("/:_id", updateMeeting);

export default router;
