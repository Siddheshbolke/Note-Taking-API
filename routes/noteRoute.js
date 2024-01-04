import express from "express"

import { createNote, deleteNote, getAllNotes, getSingleNotes, updateNote } from "../controller/noteController.js";
import { verifyToken } from "../middleware/jwt.js";


const router=express.Router();

router.post("/",verifyToken, createNote)
router.get("/", getAllNotes)
router.get("/:id", getSingleNotes)
router.put("/:id",verifyToken, updateNote)
router.delete("/:id",verifyToken, deleteNote)


export default router