import Meeting from "../models/meetingModel.js";
import CustomError from "../utils/CustomError.js";

export const createMeeting = async (req, res, next) => {
  const { title, organizer, advisor, date, time, duration, description } =
    req.body;

  const dateISO = new Date(`${date} ${time}`);

  // TODO: add more validations here

  try {
    const newMeeting = new Meeting({
      title,
      organizer,
      participants: [advisor],
      scheduledAt: dateISO,
      durationMinutes: duration,
      description,
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

export const getMeetingById = async (req, res, next) => {
  const { _id } = req.params;

  try {
    if (!_id) {
      throw new CustomError("Meeting id is required", 400);
    }

    const meeting = await Meeting.findById(_id).lean();

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

export const getMeetings = async (req, res, next) => {
  const { profileId } = req.query;

  try {
    if (!profileId) {
      throw new CustomError("Profile id is required", 400);
    }

    const meetings = await Meeting.find({
      $or: [
        { "organizer.profileId": profileId },
        { "participants.profileId": profileId },
      ],
    }).lean();

    return res.status(200).json({
      success: { message: "Meetings found" },
      data: { meetings },
    });
  } catch (error) {
    next(error);
  }
};

export const updateMeeting = () => {};
