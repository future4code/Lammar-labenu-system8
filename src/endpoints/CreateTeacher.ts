import { Request, Response } from "express";
import { connection } from "../dataBase/connection";
import { Teacher } from "../models/Teacher";

export const CreateTeacher = async ( req: Request, res: Response ): Promise<void> => {
    let errorCode = 400

    try {

        const createTeacher: Teacher = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            dateBirth: req.body.dateBirth,
            classId: req.body.classId
        }

        if (!createTeacher.name) {
            errorCode = 422
            throw new Error(
                `Por favor, insira todos os parâmetros corretamente. 
                Parâmetro 'name' não foi informado ou está incorreto!`
            )
        }

        if (!createTeacher.email) {
            errorCode = 422
            throw new Error(
                `Por favor, insira todos os parâmetros corretamente. 
                Parâmetro 'email' não foi informado ou está incorreto!`
            )
        }

        if (!createTeacher.dateBirth) {
            errorCode = 422
            throw new Error(
                `Por favor, insira todos os parâmetros corretamente. 
                Parâmetro 'dateBirth' não foi informado ou está incorreto!`
            )
        }

        if (!createTeacher.classId) {
            errorCode = 422
            throw new Error(
                `Por favor, insira todos os parâmetros corretamente. 
                Parâmetro 'classId' não foi informado ou está incorreto!`
            )
        }

        const result = await connection.raw(`
            SELECT email FROM teacher 
            WHERE email LIKE "%${createTeacher.email}"
        `)

        const registeredEmail = result[0]
        
        if (registeredEmail.length > 0) {
            errorCode = 409
            throw new Error(
                `Já existe um Docente cadastrado com o email informado, 
                por favor insira outro valor no campo email!`
            )
        }

        const resultId = await connection.raw(`
            SELECT id FROM teacher 
            WHERE id LIKE "%${createTeacher.id}"
        `)

        const registeredId = resultId[0]
        
        if (registeredId.length > 0) {
            errorCode = 409
            throw new Error(
                `Já existe um Docente cadastrado com o Id informado, 
                por favor insira outro valor no campo Id!`
            )
        }
  
        await connection.raw(`
            INSERT INTO teacher (id, name, email, date_birth, class_id)
            VALUES(
                ${createTeacher.id}, 
                "${createTeacher.name}", 
                "${createTeacher.email}", 
                "${createTeacher.dateBirth}", 
                ${createTeacher.classId}
            );
        `)

        res.status(201).send("Novo Docente cadastrado com sucesso!")

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}
