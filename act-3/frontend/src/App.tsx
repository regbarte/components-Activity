import StudentManagement from "./components/StudentManagement"

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Student Management System</h1>
        <StudentManagement />
      </div>
    </div>
  )
}

export default App

