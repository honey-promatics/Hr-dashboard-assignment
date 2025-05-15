import { FileText, ChevronDown } from "react-feather"

const AppliedLeavesTable = ({ leaves }) => {
  return (
    <div className="applied-leaves-section">
      <h3>Applied Leaves</h3>
      <table className="leaves-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Docs</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td className="profile-cell">
                <img src={leave.profilePic || "/placeholder.svg"} alt={leave.name} className="profile-pic" />
              </td>
              <td>
                <div className="employee-info">
                  <p className="employee-name">{leave.name}</p>
                  <p className="employee-designation">{leave.designation}</p>
                </div>
              </td>
              <td>{leave.date}</td>
              <td>{leave.reason}</td>
              <td>
                <div className={`status-badge ${leave.status.toLowerCase()}`}>
                  {leave.status}
                  <ChevronDown size={16} />
                </div>
              </td>
              <td>
                {leave.docs && (
                  <button className="docs-btn">
                    <FileText size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
          {leaves.length === 0 && (
            <tr>
              <td colSpan="6" className="no-leaves">
                No leaves found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AppliedLeavesTable
