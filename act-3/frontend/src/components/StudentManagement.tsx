"use client"

import { useState, useEffect } from "react"

interface Student {
  id?: number
  FirstName: string
  LastName: string
  GroupName: string
  Role: string
  ExpectedSalary: number
  ExpectedDateOfDefense: string
}

const emptyStudent: Student = {
  id: undefined,
  FirstName: "",
  LastName: "",
  GroupName: "",
  Role: "",
  ExpectedSalary: 0,
  ExpectedDateOfDefense: "",
}

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([])
  const [currentStudent, setCurrentStudent] = useState<Student>(emptyStudent)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:3000/students")
      const data = await res.json()
      setStudents(data)
    } catch (err) {
      console.error("Error fetching students:", err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentStudent(prev => ({
      ...prev,
      [name]: name === "ExpectedSalary" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const studentData = {
        ...currentStudent,
        ExpectedDateOfDefense: new Date(currentStudent.ExpectedDateOfDefense).toISOString(), // Convert to ISO string
      }

      if (isEditing && currentStudent.id) {
        await fetch(`http://localhost:3000/students/${currentStudent.id!}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        })
      } else {
        await fetch("http://localhost:3000/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        })
      }

      fetchStudents()
      resetForm()
    } catch (err) {
      console.error("Error saving student:", err)
    }
  }

  const handleEdit = (student: Student) => {
    setCurrentStudent({
      ...student,
      ExpectedDateOfDefense: new Date(student.ExpectedDateOfDefense).toISOString(), // Convert to ISO string
    })
    setIsEditing(true)
  }

  const handleDelete = async (Id: number) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await fetch(`http://localhost:3000/students/${Id}`, {
          method: "DELETE",
        })
        fetchStudents()
      } catch (err) {
        console.error("Error deleting student:", err)
      }
    }
  }

  const resetForm = () => {
    setCurrentStudent(emptyStudent)
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grId grId-cols-2 gap-4">
          {["FirstName", "LastName", "GroupName", "Role", "ExpectedSalary", "ExpectedDateOfDefense"].map(field => (
            <input
              key={field}
              type={field === "ExpectedSalary" ? "number" : field === "ExpectedDateOfDefense" ? "date" : "text"}
              name={field}
              value={currentStudent[field as keyof Student]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            {isEditing ? "Update" : "Add"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Student List */}
      <table className="w-full mt-6 border border-gray-200 rounded-md overflow-hIdden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Group</th>
            <th className="p-3 border-b">Role</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                No students found
              </td>
            </tr>
          ) : (
            students.map(student => (
              <tr key={student.id} className="hover:bg-gray-50 transition">
                <td className="p-3 border-b">{`${student.FirstName} ${student.LastName}`}</td>
                <td className="p-3 border-b">{student.GroupName}</td>
                <td className="p-3 border-b">{student.Role}</td>
                <td className="p-3 border-b space-x-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => student.id && handleDelete(student.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
