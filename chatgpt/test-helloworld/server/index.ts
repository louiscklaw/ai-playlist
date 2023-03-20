import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";

import { ChatGPTAPI } from "chatgpt";
import * as http from "http";

import cors from "cors";

dotenv.config();

const port = process.env.PORT || 8000;

const app: Express = express();
const httpServer = http.Server(app);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

app.use(cors());
app.use("/", express.static("public"));

app.get("/helloworld", async (req: Request, res: Response) => {
  const api = new ChatGPTAPI({
    apiKey: OPENAI_API_KEY,
  });

  const api_res = await api.sendMessage("are you chat gpt ?");

  res.send(api_res.text);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
