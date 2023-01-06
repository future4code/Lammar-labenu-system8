import { Request, Response } from "express";
import { connection } from "../dataBase/connection";
import { TClass, TYPE_CLASS } from "../models/class";


export const createClass = async ( req: Request, res: Response ) => {
    let errorCode = 400;
    try {
        const classCreate : TClass = {
            id: req.body.id,
            name: req.body.name,
            initial_date: req.body.initial_date,
            end_date: req.body.end_date,
            module: 0,
            type: req.body.type
        }
            if(!classCreate.id || !classCreate.name || !classCreate.initial_date || !classCreate.end_date || !classCreate.type){
                errorCode = 422;
                throw new Error("Preencha os campos corretamente!")
            }
            
            if(classCreate.type !== TYPE_CLASS.INTEGRAL && classCreate.type !== TYPE_CLASS.NOTURNO){
                errorCode = 422;
                throw new Error("Os valores possiveis são 'integral' ou 'noturno'")
            }

            if (classCreate.type === TYPE_CLASS.NOTURNO){
                classCreate.name = classCreate.name+="-night";
            }


            await connection.raw(` 
            INSERT INTO class ( id, name, initial_date, end_date, module)
            VALUES(
                 ${classCreate.id},
                "${classCreate.name}",
                "${classCreate.initial_date}",
                "${classCreate.end_date}",
                 ${classCreate.module}
            )

            `)
            res.status(201).send({message: "Turma criada com sucesso"})
    } catch (error:any) {
        res.status(errorCode).send({message: error.message})
    }
}