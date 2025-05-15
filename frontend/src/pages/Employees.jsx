"use client"

import { useState } from "react"
import Layout from "../component/layout/Layout"
import EmployeesTable from "../component/modals/EmployeesTable"
import EmployeesList from "../component/modals/EmployeesList"
import AddEmployeeModal from "../component/modals/AddEmployeeModal"
import EditEmployeeModal from "../component/modals/EditEmployeeModal"
import PositionFilter from "../component/modals/PositionFilter"
import { Plus } from "react-feather"
import "../styles/Employees.css"

const Employees = () => {
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false)
    const [editingEmployee, setEditingEmployee] = useState(null)
    const [selectedPosition, setSelectedPosition] = useState("all")
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

    const handleEditEmployee = (updatedEmployee) => {
        setEmployees(employees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)))
        setEditingEmployee(null)
    }

    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter((employee) => employee.id !== id))
    }

    const handlePositionChange = (position) => {
        setSelectedPosition(position)
    }

    // Filter employees based on selected position
    const filteredEmployees = employees.filter((employee) => {
        return selectedPosition === "all" || employee.position.toLowerCase().includes(selectedPosition.toLowerCase())
    })

    return (
        <Layout>
            <div className="employees-page">
                <div className="employees-header">
                    <h1>Employees</h1>
                    {/* <div className="employees-actions">
                        <div className="search-container">
                            <input type="text" placeholder="Search" className="search-input" />
                            <i className="search-icon"></i>
                        </div>
                        <button className="add-employee-btn" onClick={() => setIsAddEmployeeModalOpen(true)}>
                            <Plus size={16} />
                            Add Employee
                        </button>
                    </div> */}
                    <div className="employees-actions">
                        <PositionFilter
                            selectedPosition={selectedPosition}
                            onPositionChange={handlePositionChange}
                            options={[
                                { value: "all", label: "Position" },
                                { value: "intern", label: "Intern" },
                                { value: "full time", label: "Full Time" },
                                { value: "junior", label: "Junior" },
                                { value: "senior", label: "Senior" },
                                { value: "team lead", label: "Team Lead" },
                            ]}
                        />
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
                    <EmployeesList employees={filteredEmployees} />
                </div>

                {/* <div className="employees-content">
                    <EmployeesTable
                        employees={filteredEmployees}
                        onEditEmployee={(employee) => setEditingEmployee(employee)}
                        onDeleteEmployee={handleDeleteEmployee}
                    />
                </div> */}

                {isAddEmployeeModalOpen && (
                    <AddEmployeeModal onClose={() => setIsAddEmployeeModalOpen(false)} onSubmit={handleAddEmployee} />
                )}
                {editingEmployee && (
                    <EditEmployeeModal
                        employee={editingEmployee}
                        onClose={() => setEditingEmployee(null)}
                        onSubmit={handleEditEmployee}
                    />
                )}
            </div>
        </Layout>
    )
}

export default Employees
