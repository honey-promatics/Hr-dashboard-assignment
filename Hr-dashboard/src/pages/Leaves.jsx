import React, { useState } from 'react';
import Layout from '../component/layout/Layout';
import AddLeaveModal from '../component/modals/AddLeaveModal';
import AppliedLeavesTable from '../component/modals/AppliedLeavesTable';
import LeaveCalendar from '../component/modals/LeaveCalender';
import StatusFilter from '../component/modals/StatusFilter';
import '../styles/Leaves.css';

const Leaves = () => {
  const [isAddLeaveModalOpen, setIsAddLeaveModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [appliedLeaves, setAppliedLeaves] = useState([
    {
      id: 1,
      name: 'Jane Cooper',
      designation: 'Full Time Designer',
      profilePic: '/assets/profile-jane.png',
      date: '10/09/24',
      reason: 'Visiting House',
      status: 'Pending',
      docs: true
    },
    {
      id: 2,
      name: 'Cody Fisher',
      designation: 'Senior Backend Developer',
      profilePic: '/assets/profile-cody.png',
      date: '8/09/24',
      reason: 'Visiting House',
      status: 'Approved',
      docs: true
    }
  ]);

  const handleAddLeave = (newLeave) => {
    setAppliedLeaves([...appliedLeaves, {
      id: appliedLeaves.length + 1,
      ...newLeave
    }]);
    setIsAddLeaveModalOpen(false);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const filteredLeaves = selectedStatus === 'all' 
    ? appliedLeaves
    : appliedLeaves.filter(leave => leave.status.toLowerCase() === selectedStatus.toLowerCase());

  return (
    <Layout>
      <div className="leaves-page">
        <div className="leaves-header">
          <h1>Leaves</h1>
          <div className="leaves-actions">
            <StatusFilter 
              selectedStatus={selectedStatus} 
              onStatusChange={handleStatusChange} 
            />
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search" 
                className="search-input"
              />
              <i className="search-icon"></i>
            </div>
            <button 
              className="add-leave-btn"
              onClick={() => setIsAddLeaveModalOpen(true)}
            >
              Add Leave
            </button>
          </div>
        </div>
        
        <div className="leaves-content">
          <div className="leaves-table-container">
            <AppliedLeavesTable leaves={filteredLeaves} />
          </div>
          <div className="leaves-calendar-container">
            <LeaveCalendar leaves={appliedLeaves} />
          </div>
        </div>

        {isAddLeaveModalOpen && (
          <AddLeaveModal 
            onClose={() => setIsAddLeaveModalOpen(false)}
            onSubmit={handleAddLeave}
          />
        )}
      </div>
    </Layout>
  );
};

export default Leaves;
