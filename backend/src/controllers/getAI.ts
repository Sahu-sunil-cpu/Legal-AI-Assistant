import type { Request, Response } from "express";


export const getChat = async (req: Request, res: Response) => {

    res.send("**Legal Area:** Landlord-Tenant Law")
    
}