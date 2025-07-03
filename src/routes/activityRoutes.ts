import express from "express";
import { createNote, createEmail, createCall, getClientActivity, getEmails, getCalls } from "../controllers/activityController";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post("/notes", verifyToken, createNote);
router.post("/emails", verifyToken, createEmail);
router.post("/calls", verifyToken, createCall);
router.get("/", verifyToken, getEmails);
router.get("/calls", verifyToken, getCalls);
router.get("/:clientId", verifyToken, getClientActivity);



export default router;
