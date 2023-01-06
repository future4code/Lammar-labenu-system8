export enum TYPE_CLASS {
    INTEGRAL = "integral",
    NOTURNO = "noturno"
}


export  type TClass = {
    id: number;
    name: string;
    initial_date: string;
    end_date: string,
    module: number,
    type: TYPE_CLASS
}