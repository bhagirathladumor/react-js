import { useEffect, useState } from "react";
import type { studentType } from "../utils/global";

type propsType = {
  allStudents: studentType[];
  deleteStudent: (index: number) => void;
  updateStudent: (index: number) => void;
};

export default function Table({
  allStudents,
  deleteStudent,
  updateStudent,
}: propsType) {
  const [numberOfCity, setNumberOfCity] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const allCity = allStudents.map((student) => student.city);
    const uniqueCities = new Set(allCity);
    setNumberOfCity(uniqueCities.size);
  }, [allStudents]);

  const filterStudents = allStudents.filter((student) => {
    const query = search.toLowerCase();
    return (
      student.fName.toLowerCase().includes(query) ||
      student.lName.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.city.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50/50 min-h-screen antialiased">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Student Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage, filter, and monitor all registered student profiles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-all duration-200 active:scale-95">
            <svg className="w-4 h-4 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Total Students */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Students</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{allStudents.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Male Students */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Male</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">
                {allStudents.filter((s) => s.gender === "Male").length}
              </p>
            </div>
            <div className="bg-sky-50 p-3 rounded-xl text-sky-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Female Students */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Female</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">
                {allStudents.filter((s) => s.gender === "Female").length}
              </p>
            </div>
            <div className="bg-rose-50 p-3 rounded-xl text-rose-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Cities Covered */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cities</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{numberOfCity}</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Container */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 mb-6">
        <div className="relative max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search name, email, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">No.</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hobbies</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider max-w-xs">Address</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filterStudents.map((student, index) => (
                <tr key={index} className="hover:bg-slate-50/70 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-400">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">
                    {student.fName} {student.lName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <a href={`mailto:${student.email}`} className="text-blue-600 hover:underline">
                      {student.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                    {student.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-lg ${student.gender === "Male"
                        ? "bg-sky-50 text-sky-700 border border-sky-100"
                        : "bg-rose-50 text-rose-700 border border-rose-100"
                        }`}
                    >
                      {student.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {student.hobby.map((h, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-xs">
                          {h}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="text-slate-700 font-medium bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-xs">
                      {student.city}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 max-w-xs">
                    <p className="truncate hover:text-clip hover:whitespace-normal" title={student.address}>
                      {student.address}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {/* Edit Button */}
                      <button
                        onClick={() => updateStudent(index)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-90"
                        title="Edit Student"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => deleteStudent(index)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all active:scale-90"
                        title="Delete Student"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Enhanced Empty State */}
              {filterStudents.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 mb-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-700">No students found</h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-xs">
                        Your search did not match any student record. Try checking your spelling or keywords.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}