import mongoose from "mongoose";
const { Schema, model } = mongoose;

const activitySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
});