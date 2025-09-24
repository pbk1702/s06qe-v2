import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  message: { type: String },
})

export default mongoose.model("Feedback", schema);