import React from "react";

interface Employee {
  id: number;
  name: string;
  salary: number;
}
// sample data for frontend
const employees: Employee[] = [
  { id: 1235642, name: "Dela cruz, Emmanuel", salary: 40000 },
  { id: 222, name: "Villanueva, Micaella", salary: 20232145 },
  { id: 45243, name: "Barte, Reina Marie", salary: 10000 },
  { id: 8986, name: "Barte, Regine Therese", salary: 80032000 },
  { id: 14333, name: "Campo, Real", salary:100 },
];

const ListSalary = () => {
 
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Employee Salary</h1>

      <h2 className="text-lg font-semibold">Entry Level</h2>
      <table className="border-collapse border border-gray-300 w-full mb-4">
        <thead>
          <tr className="bg-blue-200">
          <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Employee Name</th>
            <th className="border border-gray-300 px-4 py-2">Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter((employee) => employee.salary < 50000)
            .map((employee) => (
              <tr key={employee.id}>
                <td className="border border-gray-300 px-4 py-2">{employee.id}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.salary} php</td>
              </tr>
            ))}
        </tbody>
      </table>


      <h2 className="text-lg font-semibold">Senior</h2>
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-green-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Employee Name</th>
            <th className="border border-gray-300 px-4 py-2">Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter((employee) => employee.salary >= 50000)
            .map((employee) => (
              <tr key={employee.id}>
                <td className="border border-gray-300 px-4 py-2">{employee.id}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.salary} php</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSalary;
