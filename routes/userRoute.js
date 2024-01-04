import express from "express"
import { deleteUser } from "../controller/userController.js";
import { verifyToken } from "../middleware/jwt.js";

const router=express.Router();

router.delete("/:id",verifyToken, deleteUser);




export default router