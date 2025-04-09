// routes/message.js
import express from "express";
import { getMessages, postMessage, uploadFile } from "../controllers/message.js";

const router = express.Router();

router.get("/:roomId", getMessages);
router.post("/", postMessage);
router.post("/upload", uploadFile);

export default router;