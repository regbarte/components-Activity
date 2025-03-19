import { Router } from "express";
import { getStudent, getStudents} from "../controllers/StudentManagement";

const studentManagementGetRoutes = Router();

studentManagementGetRoutes
    .get("/students/:id", getStudent)
    .get("/students", getStudents);

const getRoutes = Router();
getRoutes.use (studentManagementGetRoutes);

export default getRoutes;