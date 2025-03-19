import { Router } from "express";
import { deleteStudent } from "../controllers/StudentManagement";

const studentManagementDeleteRoutes = Router();

studentManagementDeleteRoutes
    .delete("/students/:id", deleteStudent);

const deleteRoutes = Router();
deleteRoutes.use (studentManagementDeleteRoutes);

export default deleteRoutes;