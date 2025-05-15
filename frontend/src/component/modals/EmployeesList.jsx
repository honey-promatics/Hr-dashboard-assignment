import { MoreVertical, Edit, Edit2, Trash2 } from "react-feather"
import EditEmployeeModal from "./EditEmployeeModal"
import "../../styles/Employees.css"
import { useState } from "react"

const EmployeesList = ({ employees }) => {
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [selectedPosition, setSelectedPosition] = useState("all")
  const [activeMenu, setActiveMenu] = useState(null)

  const toggleMenu = (id, e) => {
    e.stopPropagation() // Prevent triggering parent click events
    setActiveMenu(activeMenu === id ? null : id)
  }

  // Close menus when clicking outside
  const handleClickOutside = () => {
    setActiveMenu(null)
  }

  // const handleEditEmployee = (updatedEmployee) => {
  //   setEmployees(employees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)))
  //   setEditingEmployee(null)
  // }

  // const handleDeleteEmployee = (id) => {
  //   setEmployees(employees.filter((employee) => employee.id !== id))
  // }

  // const handlePositionChange = (position) => {
  //   setSelectedPosition(position)
  // }

  return (
    <div className="employees-list-container">
      <h3>All Employees</h3>
      <table className="employees-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Join Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="profile-cell">
                <img src={employee.profilePic || "/placeholder.svg"} alt={employee.name} className="profile-pic" />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.joinDate}</td>
              <td>
                <div className={`status-badge ${employee.status.toLowerCase()}`}>{employee.status}</div>
              </td>
              <td>
                <div className="actions-cell">
                  <button className="action-btn edit" onClick={() => isEditEmployeeModalOpen(true)}>
                    <Edit2 size={16} />
                  </button>
                  <button className="action-btn delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
              {/* <div className="action-cell">
                <button className="action-btn" onClick={(e) => toggleMenu(employee.id, e)}>
                  <MoreVertical size={18} />
                </button>
                {activeMenu === employee.id && (
                  <div className="action-menu">
                    <div
                      className="action-item"
                      onClick={() => {
                        onEditEmployee(employee)
                        setActiveMenu(null)
                      }}
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </div>
                    <div
                      className="action-item delete"
                      onClick={() => {
                        onDeleteEmployee(employee.id)
                        setActiveMenu(null)
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </div>
                  </div>
                )}
              </div> */}
              {isEditEmployeeModalOpen && (
                <EditEmployeeModal onClose={() => setIsEditEmployeeModalOpen(false)} />
              )}
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="8" className="no-employees">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeesList
