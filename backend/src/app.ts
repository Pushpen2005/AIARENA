import express from 'express';
import runGraph from './ai/graph.ai.js';
import { success } from 'zod';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: 'https://aiarena-three.vercel.app', // Adjust this to your frontend's URL
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());
app.get('/',async (req, res) => {
    const result = await runGraph("What is the capital of France?");
    res.json(result);   
});
app.post('/invoke', async (req, res) => {
    const { input } = req.body;
    const result = await runGraph(input);
    res.status(200).json({
        message: "Graph executed successfully",success: true, data: result
    });
});

export default app;