// import mongoose from "mongoose";
// import Message from "./message.js";

// const roomSchema = mongoose.Schema({
//   name: String,
//   users: [{ userId: String, userName: String }],
//   isProtected: { type: Boolean, default: false },
//   host: String,
//   messages: [Message],
//   UpdatedAt: {
//     type: Date,
//     default: new Date(),
//   },
// });

// export default mongoose.model("Room", roomSchema);

import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: String,
  users: [{ userId: String, userName: String }],
  isProtected: { type: Boolean, default: false },
  host: String,
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Room", roomSchema);