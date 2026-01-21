import express from "express";
import dotenv from "dotenv";
import { startListeners } from "./blockchain/eventListener";

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (optional, you can add as needed)
app.use(express.json());

// Example health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Start blockchain event listeners
startListeners()
  .then(() => {
    console.log("Blockchain event listeners started successfully.");
  })
  .catch((err) => {
    console.error("Failed to start blockchain listeners:", err);
  });

// Start Express server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
