"use client"

import { useEffect, useState } from "react"
import Layout from "../component/layout/Layout"
import EmployeesTable from "../component/modals/EmployeesTable"
import EmployeesList from "../component/modals/EmployeesList"
import AddEmployeeModal from "../component/modals/AddEmployeeModal"
import EditEmployeeModal from "../component/modals/EditEmployeeModal"
import PositionFilter from "../component/modals/PositionFilter"
import { Plus } from "react-feather"
import "../styles/Employees.css"
import { httpRequest } from "../utils/httpRequest"
import { toast } from "react-toastify"

const Employees = () => {
    const baseUrl = import.meta.env.VITE_Backend_Url
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false)

    const [editingEmployee, setEditingEmployee] = useState(null)
    const [selectedPosition, setSelectedPosition] = useState("all")
    const [ischange, setischange] = useState(false)

    const [employees, setEmployees] = useState([])

    const handleEditEmployee = (updatedEmployee) => {
        setEmployees(employees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)))
        setEditingEmployee(null)
    }

    const handleDeleteEmployee = async (id) => {
        try {
            const response = await httpRequest(
                `api/employees/employee/${id}`,
                "delete",
                {},
                {},
                true,
                false
            );
            console.log("response : ", response)

            setischange(prev => !prev)
            if (response.success) {
                toast.success('employee deleted successfully')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePositionChange = (position) => {
        setSelectedPosition(position)
    }

    const filteredEmployees = employees.filter((employee) => {
        return selectedPosition === "all" || employee.position.toLowerCase().includes(selectedPosition.toLowerCase())
    })


    const fetchCandidate = async () => {
        try {
            const response = await httpRequest(
                `api/employees/getEmployees`,
                "get",
                {},
                {},
                true,
                false
            );
            console.log("response : ", response)

            if (response.success) {
                setEmployees(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    // useEffect(() => {
    //     const controller = new AbortController();
    //     const signal = controller.signal;

    //     const fetchData = async () => {
    //         try {
    //             await fetchCandidate(signal);
    //         } catch (error) {
    //             if (error.name !== 'AbortError') {
    //                 console.error('Fetch error:', error);
    //             }
    //         }
    //     };

    //     fetchData();

    //     return () => controller.abort();
    // }, [ischange]);

    useEffect(() => {
        fetchCandidate();
    }, [ischange]);

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
                    <EmployeesList employees={filteredEmployees} deleteEmployee={handleDeleteEmployee} onSuccess={() => setischange(prev => !prev)} />
                </div>

                {/* <div className="employees-content">
                    <EmployeesTable
                        employees={filteredEmployees}
                        onEditEmployee={(employee) => setEditingEmployee(employee)}
                        onDeleteEmployee={handleDeleteEmployee}
                    />
                </div> */}

                {isAddEmployeeModalOpen && (
                    <AddEmployeeModal onClose={() => setIsAddEmployeeModalOpen(false)} onSuccess={() => setischange(prev => !prev)} />
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
