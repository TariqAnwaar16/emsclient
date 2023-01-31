import axios from 'axios'



export default class EmployeeService {

    async getEmployees() {
        return await axios.get('https://localhost:7282/api/Employees');
    }

    async CreateEmployee(obj) {
        await axios.post('https://localhost:7282/api/Employees', obj);
    }

    async EditEmployee(id, obj) {
        await axios.put('https://localhost:7282/api/Employees/' + id, obj);
    }

    async DeleteEmployee(id) {
        debugger
        await axios.delete('https://localhost:7282/api/Employees/' + id);
    }

    async getDepartments() {
        return await axios.get('https://localhost:7282/api/Departments');
    }
}