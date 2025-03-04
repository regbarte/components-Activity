import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

const router = express.Router();
router.get('/', (req, res) => {
    const data = [
        { id: 1235642, name: "Dela cruz, Emmanuel", salary: 40000 },
        { id: 222, name: "Villanueva, Micaella", salary: 20232145 },
        { id: 45243, name: "Barte, Reina Marie", salary: 10000 },
        { id: 8986, name: "Barte, Regine Therese", salary: 80032000 },
        { id: 14333, name: "Campo, Real", salary:100 },
      ];
    res.json(data);
});

export default router;