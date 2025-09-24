import mongoose, { Mongoose } from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: { type: String, trim: true, lowercase: true }
})

const commentSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  body: { type: String, trim: true, required: true },
})

const schema = new mongoose.Schema({
  title: { type: String, trim: true, required: true, unique: true, },
  body: { type: String, trim: true, required: false, unique: false, },
  subscribers: [ subscriberSchema ],
  comments: [ commentSchema ],
})

export default mongoose.model("Post", schema)