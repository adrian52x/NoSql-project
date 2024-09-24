import mongoose from "mongoose";
const { Schema, model } = mongoose;

const enrolmentSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    activityId: { type: Schema.Types.ObjectId, ref: "Activity", required: true },
    dateEnrolled: { type: Date, default: new Date() },
});

const Enrolment = model("Enrolment", enrolmentSchema);

export default Enrolment;