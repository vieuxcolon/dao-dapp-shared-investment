import express from 'express';
import cors from 'cors';
import { startListeners } from './blockchain/eventListener';

const app = express();
app.use(cors());
app.use(express.json());

startListeners();

app.get('/', (req, res) => {
  res.send('DAO Backend is running 🚀');
});

app.listen(3000, () => {
  console.log('Backend server running on port 3000');
});
