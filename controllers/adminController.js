import Meeting from "../models/meetingModel.js";

export const getAllMeetings = async (req, res, next) => {
  const { title, date, organizer, page = 1, limit = 5 } = req.query;

  const filters = {};

  if (title) {
    filters.title = { $regex: title, $options: "i" };
  }

  if (date) {
    const timeZoneOffset = new Date(date).getTimezoneOffset() / 60;
    
    const startDate = new Date(
      new Date(date).setUTCHours(0, 0, 0, 0) + timeZoneOffset * 60 * 60 * 1000
    );
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

    filters.scheduledAt = { $gte: startDate, $lte: endDate };
  }

  if (organizer) {
    filters["organizer.name.firstName"] = { $regex: organizer, $options: "i" };
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(limit, 10) || 5, 1), 100);

  try {
    const meetings = await Meeting.find(filters)
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize)
      .lean();

    if (!meetings) {
      throw new CustomError("No meetings found", 404);
    }

    const totalCount = await Meeting.countDocuments(filters);

    return res.status(200).json({
      success: { message: "All meetings retrieved successfully" },
      data: {
        meetings,
        pagination: {
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          currentPage: pageNum,
          pageSize,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
