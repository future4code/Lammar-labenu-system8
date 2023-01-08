import { Request, Response } from "express";
import { connection } from "../dataBase/connection";

export const GetAllTeachers = async ( req: Request, res: Response ): Promise<void> => {
    let errorCode = 400

    try {
        const result = await connection.raw(`
            SELECT * FROM teacher; 
        `)

        const allTeachers = result[0]
        
        if (allTeachers.length < 1) {
            errorCode = 500
            throw new Error("Erro inesperado no servidor. Requisição indisponível no momento!")
        }

        res.status(200).send(allTeachers)

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}