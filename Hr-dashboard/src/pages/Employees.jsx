"use client"

import { useState } from "react"
import Layout from "../component/layout/Layout"
import EmployeesList from "../component/modals/EmployeesList"
import AddEmployeeModal from "../component/modals/AddEmployeeModal"
import { Plus } from "react-feather"
import "../styles/Employees.css"

const Employees = () => {
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false)
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Jane Cooper",
      profilePic: "/assets/profile-jane.png",
      email: "jane@example.com",
      position: "Full Time Designer",
      department: "UI/UX",
      joinDate: "10/05/22",
      status: "Active",
    },
    {
      id: 2,
      name: "Cody Fisher",
      profilePic: "/assets/profile-cody.png",
      email: "cody@example.com",
      position: "Senior Backend Developer",
      department: "Engineering",
      joinDate: "03/12/23",
      status: "Active",
    },
  ])

  const handleAddEmployee = (newEmployee) => {
    setEmployees([
      ...employees,
      {
        id: employees.length + 1,
        ...newEmployee,
        status: "Active",
      },
    ])
    setIsAddEmployeeModalOpen(false)
  }

  return (
    <Layout>
      <div className="employees-page">
        <div className="employees-header">
          <h1>Employees</h1>
          <div className="employees-actions">
            <div className="search-container">
              <input type="text" placeholder="Search" className="search-input" />
              <i className="search-icon"></i>
            </div>
            <button className="add-employee-btn" onClick={() => setIsAddEmployeeModalOpen(true)}>
              <Plus size={16} />
              Add Employee
            </button>
          </div>
        </div>

        <div className="employees-content">
          <EmployeesList employees={employees} />
        </div>

        {isAddEmployeeModalOpen && (
          <AddEmployeeModal onClose={() => setIsAddEmployeeModalOpen(false)} onSubmit={handleAddEmployee} />
        )}
      </div>
    </Layout>
  )
}

export default Employees
