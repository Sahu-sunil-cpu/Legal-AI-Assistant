

import { getChat } from "controllers/getAI";
import { postChatToAI } from "controllers/postAI";
import { Router } from "express";

export const route = Router();

route.get("/legal/chat", getChat);

route.post("/ai/chat", postChatToAI);


