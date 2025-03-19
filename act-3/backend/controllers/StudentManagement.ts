import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prisma";


const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await prisma.studentManagement.findMany();
        res.json(students);
    } catch (error) {
        next(error);
    }
};


const getStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await prisma.studentManagement.findUnique({ 
            where: {
                id: Number(req.params.id),
            },
        });

        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return
        }

        res.json(student);
    } catch (error) {
        next(error);
    }
};

const postStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {   
        const student = await prisma.studentManagement.create({
            data: req.body,
        });
        res.json(student);
    } catch (error) {
        next(error);
    }
};

const putStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await prisma.studentManagement.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        });

        res.json(student);
    }
    catch (error) {
        next(error);
    }
}

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await prisma.studentManagement.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        res.json({ message: "Student deleted" });
        return
    }
    catch (error) {
        next(error);
    }
}

export { getStudents, getStudent, postStudent, putStudent, deleteStudent };
