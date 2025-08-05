import type { Request, Response } from "express";
import { main } from "genAI/integrate";


export const postChatToAI = async (req: Request, res: Response) => {
    const data = req.body;
    console.log(req.body)

    const response = await main(data, res);
}