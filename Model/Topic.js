import mongoose from "mongoose";
const { Schema, model } = mongoose;

const topicSchema = new Schema({
    topicTitle: { type: String, required: true },
    description: { type: String, required: true },
});

// create text index on the topicTitle field
topicSchema.index({ topicTitle: "text",  description: 'text' });

const Topic = model("Topic", topicSchema);

export default Topic;