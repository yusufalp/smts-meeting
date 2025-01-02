import Meeting from "../models/meetingModel.js";

export const getAllMeetingsByAdmin = async (req, res, next) => {
  const { date, page = 1, limit = 5 } = req.query;

  const filters = {};

  if (date) {
    filters.date = date;
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
