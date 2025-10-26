import { useState } from "react";

const StudentList = () => {
  const students = [
    { name: "John Doe", marks: 85 },
    { name: "Jane Smith", marks: 92 },
    { name: "Bob Johnson", marks: 78 },
    { name: "Alice Brown", marks: 95 },
    { name: "Charlie Wilson", marks: 88 },
    { name: "Diana Miller", marks: 90 },
    { name: "Edward Davis", marks: 82 },
    { name: "Fiona Clark", marks: 87 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 3;

  const lastIndex = currentPage * studentsPerPage;
  const firstIndex = lastIndex - studentsPerPage;
  const currentStudents = students.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden">
        <h2 className="text-2xl font-bold text-center py-4 text-blue-700 border-b">
          Student List
        </h2>

        <table className="w-full text-left">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-2 px-4 font-semibold">Name</th>
              <th className="py-2 px-4 font-semibold text-right">Marks</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4 text-right">{student.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 border-t bg-gray-50">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
