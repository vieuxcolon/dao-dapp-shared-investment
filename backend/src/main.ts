import express from 'express';
import cors from 'cors';
import { startListeners } from './blockchain/eventListener';

const app = express();
app.use(cors());
app.use(express.json());

startListeners();

app.listen(3000, () => {
  console.log('Backend server running on port 3000');
});
