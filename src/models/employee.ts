export interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    role_id: number;
    manager_id: number | null;
}
