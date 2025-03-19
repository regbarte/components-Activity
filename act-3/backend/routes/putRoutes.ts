import { Router } from "express";
import { putStudent } from "../controllers/StudentManagement";

const studentManagementPutRoutes = Router();

studentManagementPutRoutes
    .put("/students/:id", putStudent);

const putRoutes = Router();
putRoutes.use (studentManagementPutRoutes);

export default putRoutes;



