import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// API to save submitted name
app.post('/submit-name', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }

    try {
        const newEntry = await prisma.user.create({
            data: { name },
        });
        res.json(newEntry);
    } catch (error) {
        res.status(500).json({ error: 'Error saving name' });
    }
});

// API to get all names
app.get('/names', async (req, res) => {
    try {
        const names = await prisma.user.findMany();
        res.json(names);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching names' });
        console.log(error);
    }
});

// API to delete a name
app.delete('/delete-name', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }

    try {
        await prisma.user.deleteMany({
            where: { name },
        });
        res.json({ message: 'Name deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting name' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
