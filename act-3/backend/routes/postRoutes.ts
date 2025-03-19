import { Router } from "express";
import { postStudent } from "../controllers/StudentManagement";

const studentManagementPostRoutes = Router();

studentManagementPostRoutes
    .post("/students", postStudent);

const postRoutes = Router();
postRoutes.use (studentManagementPostRoutes);

export default postRoutes;