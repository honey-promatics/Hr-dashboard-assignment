import { useState } from 'react';
import '../../styles/Modal.css';

const AddCandidateModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    resumeName: '',
    declaration: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        resume: file,
        resumeName: file.name
      });
    }
  };

  const handleRemoveFile = () => {
    setFormData({
      ...formData,
      resume: null,
      resumeName: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.declaration) {
      alert('Please accept the declaration');
      return;
    }
    
    onSave({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      status: 'New',
      experience: formData.experience
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Candidate</h2>
          <button className="close-btn" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name<span className="required">*</span></label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email Address<span className="required">*</span></label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number<span className="required">*</span></label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Position<span className="required">*</span></label>
                <input 
                  type="text" 
                  name="position" 
                  value={formData.position} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Experience<span className="required">*</span></label>
                <input 
                  type="text" 
                  name="experience" 
                  value={formData.experience} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Resume<span className="required">*</span></label>
                {formData.resumeName ? (
                  <div className="file-selected">
                    <span>{formData.resumeName}</span>
                    <button type="button" className="remove-file" onClick={handleRemoveFile}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="file-upload">
                    <input 
                      type="file" 
                      id="resume" 
                      name="resume" 
                      onChange={handleFileChange} 
                      accept=".pdf,.doc,.docx" 
                      className="file-input"
                    />
                    <label htmlFor="resume" className="file-label">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="form-row declaration">
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="declaration" 
                  name="declaration" 
                  checked={formData.declaration} 
                  onChange={handleChange} 
                />
                <label htmlFor="declaration">
                  I hereby declare that the above information is true to the best of my knowledge and belief
                </label>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateModal;