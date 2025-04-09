// // import mongoose from "mongoose";

// // const messageSchema = mongoose.Schema({
// //   senderId: String,
// //   sender: String,
// //   message: String,
// //   timestamp: {
// //     type: Date,
// //     default: new Date(),
// //   },
// // });

// // export default messageSchema;
// // models/message.js
// import mongoose from "mongoose";

// const messageSchema = mongoose.Schema({
//   senderId: { type: String, required: true },
//   roomId: { type: String, required: true },
//   message: { type: String, required: true },
//   isFile: { type: Boolean, default: false },
//   fileUrl: { type: String },
//   fileType: { type: String }, // image, audio, pdf, presentation, etc.
//   timestamp: { type: Date, default: new Date() }
// });

// const Message = mongoose.model("Message", messageSchema);

// export default Message;
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  message: { type: String, required: true },
  isFile: { type: Boolean, default: false },
  fileUrl: { type: String },
  fileType: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Message", messageSchema);