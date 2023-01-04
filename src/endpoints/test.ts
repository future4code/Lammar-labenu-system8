import { Request, Response } from "express";

export const test = async ( req: Request, res: Response ): Promise<void> => {
    res.status(200).send("pong")
}
