import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { startListeners } from './blockchain/eventListener';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('DAO backend running');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startListeners(); // start blockchain event listeners
});
