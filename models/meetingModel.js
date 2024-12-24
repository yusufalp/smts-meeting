import { Schema, model } from "mongoose";

const meetingSchema = new Schema(
  {
    title: { type: String, required: true },
    learnerId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
    advisorId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
    scheduledDate: { type: Date, required: true },
    durationMinutes: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

const Meeting = model("Meeting", meetingSchema);

export default Meeting;
