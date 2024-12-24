import Meeting from "../models/meetingModel.js";
import CustomError from "../utils/CustomError.js";

export const createMeeting = async (req, res, next) => {
  const { title, advisorId, learnerId, date, time, duration, notes } = req.body;
  const userId = req.user._id;

  const dateISO = new Date(`${date} ${time}`);

  // TODO: add more validations here

  try {
    if (!userId) {
      throw new CustomError("User id is required", 400);
    }

    const newMeeting = new Meeting({
      title,
      learnerId,
      advisorId,
      scheduledDate: dateISO,
      durationMinutes,
      notes,
    });

    await newMeeting.save();

    return res.status(201).json({
      status: { message: "A new meeting is created" },
      data: { meeting: newMeeting },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMeeting = () => {};

export const getAllMeetings = async (req, res, next) => {
  const userId = req.user._id;
  const { role, profileId } = req.query;

  try {
    if (!userId) {
      throw new CustomError("User id is required", 400);
    }

    const filter = {
      mentor: { advisor: profileId },
      coach: { advisor: profileId },
      mentee: { learner: profileId },
    };

    if (!filter[role]) {
      throw new CustomError(`Invalid role: ${role}`, 400);
    }

    const meetings = await Meeting.find(filter[role])
      .populate("learner", "name")
      .populate("advisor", "name")
      .lean();

    return res.status(200).json({
      success: { message: "Meetings found" },
      data: { meetings },
    });
  } catch (error) {
    next(error);
  }
};

export const getMeetingById = async (req, res, next) => {
  const { meetingId } = req.params;

  try {
    if (!meetingId) {
      throw new CustomError("Meeting id is required", 400);
    }

    const meeting = await Meeting.findById(meetingId)
      .populate("learnerId", "name")
      .populate("advisorId", "name")
      .lean();

    if (!meeting) {
      throw new CustomError("Meeting not found", 404);
    }

    return res.status(200).json({
      success: { message: "Meeting is found" },
      data: { meeting },
    });
  } catch (error) {
    next(error);
  }
};

export const updateMeeting = () => {};
