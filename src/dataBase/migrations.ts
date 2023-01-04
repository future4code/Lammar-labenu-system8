import { connection } from "./connection"

const createTables = async (): Promise<any> => {
    await connection.raw(`
        CREATE TABLE class (
            id INT NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            initial_date DATE NOT NULL,
            end_date DATE NOT NULL,
            module INT NOT NULL DEFAULT 0
        );

        CREATE TABLE student (
            id INT NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            date_birth DATE NOT NULL,
            class_id INT NOT NULL,
            FOREIGN KEY(class_id) REFERENCES class(id)
        );

        CREATE TABLE teacher (
            id INT NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            date_birth DATE NOT NULL,
            class_id INT NOT NULL,
            FOREIGN KEY(class_id) REFERENCES class(id)
        );

        CREATE TABLE hobby (
            id INT NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );

        CREATE TABLE hooby_student(
            student_id INT NOT NULL,
            hobby_id INT NOT NULL,
            PRIMARY KEY (student_id, hobby_id),
            FOREIGN KEY (student_id) REFERENCES student(id),
            FOREIGN KEY (hobby_id) REFERENCES hobby(id)
        );

        CREATE TABLE specialty (
            id INT NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );

        CREATE TABLE specialty_teacher(
            teacher_id INT NOT NULL,
            specialty_id INT NOT NULL,
            PRIMARY KEY (teacher_id, specialty_id),
            FOREIGN KEY (teacher_id) REFERENCES teacher(id),
            FOREIGN KEY (specialty_id) REFERENCES specialty(id)
        );
    `)
    
    console.table("Tabelas criadas com sucesso!")
}

createTables()
