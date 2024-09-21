import mongoose from "mongoose";
const { Schema, model } = mongoose;

const studentSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },   
});


const Student = model("Student", studentSchema);

export default Student;