import { useState } from 'react';
import Layout from '../component/layout/Layout';
import '../styles/Candidates.css';
import AddCandidateModal from '../component/modals/AddCandidateModal';

const Candidates = () => {
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [candidates, setCandidates] = useState([
    {
      id: '01',
      name: 'Jane Copper',
      email: 'jane.copper@example.com',
      phone: '(704) 555-0127',
      position: 'Designer Intern',
      status: 'New',
      experience: '0'
    },
    {
      id: '02',
      name: 'Janney Wilson',
      email: 'janney.wilson@example.com',
      phone: '(252) 555-0126',
      position: 'Senior Developer',
      status: 'New',
      experience: '1+'
    },
    {
      id: '03',
      name: 'Guy Hawkins',
      email: 'kenzi.lawson@example.com',
      phone: '(907) 555-0101',
      position: 'Human Resource Intern',
      status: 'New',
      experience: '10+'
    },
    {
      id: '04',
      name: 'Arlene McCoy',
      email: 'arlene.mccoy@example.com',
      phone: '(302) 555-0107',
      position: 'Full Time Designer',
      status: 'Selected',
      experience: '5+'
    },
    {
      id: '05',
      name: 'Leslie Alexander',
      email: 'willie.jennings@example.com',
      phone: '(207) 555-0119',
      position: 'Full Time Developer',
      status: 'Rejected',
      experience: '0'
    }
  ]);

  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const toggleActionMenu = (id) => {
    if (actionMenuOpen === id) {
      setActionMenuOpen(null);
    } else {
      setActionMenuOpen(id);
    }
  };

  const handleAddCandidate = (newCandidate) => {
    setCandidates([...candidates, {
      id: String(candidates.length + 1).padStart(2, '0'),
      ...newCandidate
    }]);
    setShowModal(false);
  };

  const handleDownloadResume = (id) => {
    console.log(`Downloading resume for candidate ${id}`);
    setActionMenuOpen(null);
  };

  const handleDeleteCandidate = (id) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id));
    setActionMenuOpen(null);
  };

  return (
    <Layout title="Candidates">
      <div className="candidates-container">
        <div className="filters-container">
          <div className="filter">
            <div className="filter-dropdown">
              <span>Status</span>
              <span className="dropdown-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
          </div>
          <div className="filter">
            <div className="filter-dropdown">
              <span>Position</span>
              <span className="dropdown-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
          </div>
          <div className="search-box">
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input type="text" placeholder="Search" />
          </div>
          <button className="add-candidate-btn" onClick={() => setShowModal(true)}>
            Add Candidate
          </button>
        </div>

        <div className="candidates-table">
          <div className="table-header">
            <div className="header-cell sr-no">Sr no.</div>
            <div className="header-cell name">Candidates Name</div>
            <div className="header-cell email">Email Address</div>
            <div className="header-cell phone">Phone Number</div>
            <div className="header-cell position">Position</div>
            <div className="header-cell status">Status</div>
            <div className="header-cell experience">Experience</div>
            <div className="header-cell action">Action</div>
          </div>
          <div className="table-body">
            {candidates.map((candidate) => (
              <div className="table-row" key={candidate.id}>
                <div className="cell sr-no">{candidate.id}</div>
                <div className="cell name">{candidate.name}</div>
                <div className="cell email">{candidate.email}</div>
                <div className="cell phone">{candidate.phone}</div>
                <div className="cell position">{candidate.position}</div>
                <div className="cell status">
                  <div className={`status-badge ${candidate.status.toLowerCase()}`}>
                    {candidate.status}
                    <span className="dropdown-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="cell experience">{candidate.experience}</div>
                <div className="cell action">
                  <div className="action-menu-container">
                    <button className="action-btn" onClick={() => toggleActionMenu(candidate.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </button>
                    {actionMenuOpen === candidate.id && (
                      <div className="action-menu">
                        <div className="action-item" onClick={() => handleDownloadResume(candidate.id)}>
                          Download Resume
                        </div>
                        <div className="action-item delete" onClick={() => handleDeleteCandidate(candidate.id)}>
                          Delete Candidate
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <AddCandidateModal 
          onClose={() => setShowModal(false)} 
          onSave={handleAddCandidate}
        />
      )}
    </Layout>
  );
};

export default Candidates;