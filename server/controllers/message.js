// controllers/message.js
import Message from "../models/message.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// Configure file filter
const fileFilter = (req, file, cb) => {
  // Accept images, PDFs, presentations and audio files
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf',
    'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'audio/mpeg', 'audio/wav', 'audio/ogg'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, presentations, and audio files are allowed.'), false);
  }
};

// Setup multer middleware
export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).single('file');

export const uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const { userId, roomId } = req.body;
      
      // Create file URL
      const fileUrl = `/uploads/${req.file.filename}`;
      
      // Get file type category
      let fileType = 'document';
      if (req.file.mimetype.startsWith('image/')) {
        fileType = 'image';
      } else if (req.file.mimetype.startsWith('audio/')) {
        fileType = 'audio';
      } else if (req.file.mimetype.includes('presentation')) {
        fileType = 'presentation';
      } else if (req.file.mimetype === 'application/pdf') {
        fileType = 'pdf';
      }
      
      // Save message to database
      const newMessage = new Message({
        senderId: userId,
        roomId: roomId,
        message: req.file.originalname,
        isFile: true,
        fileUrl: fileUrl,
        fileType: fileType,
        timestamp: new Date()
      });
      
      await newMessage.save();

      // Get sender name from user model if needed
      // For now using a placeholder
      const sender = "User"; // This should be replaced with actual user query
      
      // Return the file message data
      return res.status(201).json({
        senderId: userId,
        sender: sender, // This should come from your user database
        message: req.file.originalname,
        isFile: true,
        fileUrl: fileUrl,
        fileType: fileType,
        timestamp: new Date()
      });
    } catch (error) {
      console.error("Error saving file message:", error);
      return res.status(500).json({ message: "Server error uploading file" });
    }
  });
};

export const getMessages = async (req, res) => {
  const { roomId } = req.params;
  
  try {
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postMessage = async (req, res) => {
  const { userId, roomId, message } = req.body;
  
  try {
    const newMessage = new Message({
      senderId: userId,
      roomId,
      message,
      timestamp: new Date()
    });
    
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};