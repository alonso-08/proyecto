export interface Employee {
    id_employee?: number
    name: string,
    last_name: string,
    email: string,
    nationality: string,
    phone: string,
    civil_status: string,
    birthday: string
}

export interface ModuleEmployee {
    data: Data;
}

interface Data {
    getCountEmployees?: GetLengthTable[];
    getEmployees?: Employee[];
    getCountEmployeesByMatch?: GetLengthTable[];
    getEmployeesByMatch?: Employee[];
    login?: Login;
}

interface GetLengthTable {
    length: number;
}

export interface Login {
    token:   string;
    message: string;
    full_name: string
}
