import mongoose from "mongoose";
const { Schema, model } = mongoose;

const topicSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});


const Topic = model("Topic", topicSchema);

export default Topic;