import { Edit2, Trash2 } from "react-feather"
import "../../styles/Employees.css"

const EmployeesList = ({ employees }) => {
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
                  <button className="action-btn edit">
                    <Edit2 size={16} />
                  </button>
                  <button className="action-btn delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
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
