"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var pg_1 = require("pg");
// Create a connection to the database
var client;
function initializeConnection() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new pg_1.Client({
                        host: 'localhost',
                        user: 'postgres',
                        password: 'Lucklove3355',
                        database: 'company_db',
                        port: 5432
                    });
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Function to view all departments
function viewAllDepartments() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.query('SELECT id, name FROM departments')];
                case 1:
                    res = _a.sent();
                    console.table(res.rows);
                    return [2 /*return*/];
            }
        });
    });
}
// Function to view all roles
function viewAllRoles() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.query("\n    SELECT roles.id, roles.title, departments.name AS department, roles.salary\n    FROM roles\n    JOIN departments ON roles.department_id = departments.id\n  ")];
                case 1:
                    res = _a.sent();
                    console.table(res.rows);
                    return [2 /*return*/];
            }
        });
    });
}
// Function to view all employees
function viewAllEmployees() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.query("\n    SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager\n    FROM employees\n    JOIN roles ON employees.role_id = roles.id\n    JOIN departments ON roles.department_id = departments.id\n    LEFT JOIN employees manager ON manager.id = employees.manager_id\n  ")];
                case 1:
                    res = _a.sent();
                    console.table(res.rows);
                    return [2 /*return*/];
            }
        });
    });
}
// Function to add a department
function addDepartment() {
    return __awaiter(this, void 0, void 0, function () {
        var name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt({
                        name: 'name',
                        type: 'input',
                        message: 'Enter the name of the department:'
                    })];
                case 1:
                    name = (_a.sent()).name;
                    return [4 /*yield*/, client.query('INSERT INTO departments (name) VALUES ($1)', [name])];
                case 2:
                    _a.sent();
                    console.log("Added ".concat(name, " to the database"));
                    return [2 /*return*/];
            }
        });
    });
}
// Function to add a role
function addRole() {
    return __awaiter(this, void 0, void 0, function () {
        var res, _a, title, salary, department_id;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, client.query('SELECT id, name FROM departments')];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                name: 'title',
                                type: 'input',
                                message: 'Enter the name of the role:'
                            },
                            {
                                name: 'salary',
                                type: 'input',
                                message: 'Enter the salary of the role:'
                            },
                            {
                                name: 'department_id',
                                type: 'list',
                                message: 'Select the department for the role:',
                                choices: res.rows.map(function (department) { return ({
                                    name: department.name,
                                    value: department.id
                                }); })
                            }
                        ])];
                case 2:
                    _a = _b.sent(), title = _a.title, salary = _a.salary, department_id = _a.department_id;
                    return [4 /*yield*/, client.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id])];
                case 3:
                    _b.sent();
                    console.log("Added ".concat(title, " to the database"));
                    return [2 /*return*/];
            }
        });
    });
}
// Function to add an employee
function addEmployee() {
    return __awaiter(this, void 0, void 0, function () {
        var rolesRes, employeesRes, _a, first_name, last_name, role_id, manager_id;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, client.query('SELECT id, title FROM roles')];
                case 1:
                    rolesRes = _b.sent();
                    return [4 /*yield*/, client.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees')];
                case 2:
                    employeesRes = _b.sent();
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                name: 'first_name',
                                type: 'input',
                                message: 'Enter the first name of the employee:'
                            },
                            {
                                name: 'last_name',
                                type: 'input',
                                message: 'Enter the last name of the employee:'
                            },
                            {
                                name: 'role_id',
                                type: 'list',
                                message: 'Select the role for the employee:',
                                choices: rolesRes.rows.map(function (role) { return ({
                                    name: role.title,
                                    value: role.id
                                }); })
                            },
                            {
                                name: 'manager_id',
                                type: 'list',
                                message: 'Select the manager for the employee:',
                                choices: [{ name: 'None', value: null }].concat(employeesRes.rows.map(function (employee) { return ({
                                    name: employee.name,
                                    value: employee.id
                                }); }))
                            }
                        ])];
                case 3:
                    _a = _b.sent(), first_name = _a.first_name, last_name = _a.last_name, role_id = _a.role_id, manager_id = _a.manager_id;
                    return [4 /*yield*/, client.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id])];
                case 4:
                    _b.sent();
                    console.log("Added ".concat(first_name, " ").concat(last_name, " to the database"));
                    return [2 /*return*/];
            }
        });
    });
}
// Function to update an employee role
function updateEmployeeRole() {
    return __awaiter(this, void 0, void 0, function () {
        var employeesRes, rolesRes, _a, employee_id, role_id;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, client.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees')];
                case 1:
                    employeesRes = _b.sent();
                    return [4 /*yield*/, client.query('SELECT id, title FROM roles')];
                case 2:
                    rolesRes = _b.sent();
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                name: 'employee_id',
                                type: 'list',
                                message: 'Select the employee to update:',
                                choices: employeesRes.rows.map(function (employee) { return ({
                                    name: employee.name,
                                    value: employee.id
                                }); })
                            },
                            {
                                name: 'role_id',
                                type: 'list',
                                message: 'Select the new role for the employee:',
                                choices: rolesRes.rows.map(function (role) { return ({
                                    name: role.title,
                                    value: role.id
                                }); })
                            }
                        ])];
                case 3:
                    _a = _b.sent(), employee_id = _a.employee_id, role_id = _a.role_id;
                    return [4 /*yield*/, client.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id])];
                case 4:
                    _b.sent();
                    console.log("Updated employee's role");
                    return [2 /*return*/];
            }
        });
    });
}
// Main function to prompt user and call appropriate function
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var action, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 22, , 23]);
                    return [4 /*yield*/, initializeConnection()];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 21];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            name: 'action',
                            type: 'list',
                            message: 'What would you like to do?',
                            choices: [
                                'View all departments',
                                'View all roles',
                                'View all employees',
                                'Add a department',
                                'Add a role',
                                'Add an employee',
                                'Update an employee role',
                                'Exit'
                            ]
                        })];
                case 3:
                    action = (_b.sent()).action;
                    _a = action;
                    switch (_a) {
                        case 'View all departments': return [3 /*break*/, 4];
                        case 'View all roles': return [3 /*break*/, 6];
                        case 'View all employees': return [3 /*break*/, 8];
                        case 'Add a department': return [3 /*break*/, 10];
                        case 'Add a role': return [3 /*break*/, 12];
                        case 'Add an employee': return [3 /*break*/, 14];
                        case 'Update an employee role': return [3 /*break*/, 16];
                        case 'Exit': return [3 /*break*/, 18];
                    }
                    return [3 /*break*/, 20];
                case 4: return [4 /*yield*/, viewAllDepartments()];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 6: return [4 /*yield*/, viewAllRoles()];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 8: return [4 /*yield*/, viewAllEmployees()];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 10: return [4 /*yield*/, addDepartment()];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 12: return [4 /*yield*/, addRole()];
                case 13:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 14: return [4 /*yield*/, addEmployee()];
                case 15:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 16: return [4 /*yield*/, updateEmployeeRole()];
                case 17:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 18:
                    console.log('Goodbye!');
                    return [4 /*yield*/, client.end()];
                case 19:
                    _b.sent();
                    process.exit(0);
                    _b.label = 20;
                case 20: return [3 /*break*/, 2];
                case 21: return [3 /*break*/, 23];
                case 22:
                    error_1 = _b.sent();
                    console.error('Error connecting to the database:', error_1);
                    return [3 /*break*/, 23];
                case 23: return [2 /*return*/];
            }
        });
    });
}
main();
