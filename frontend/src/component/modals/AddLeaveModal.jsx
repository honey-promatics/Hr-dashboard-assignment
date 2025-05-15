import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, Calendar, Upload } from 'react-feather';

// Validation schema using Yup
const AddLeaveSchema = Yup.object().shape({
  employee: Yup.string()
    .required('Employee is required'),
  designation: Yup.string()
    .required('Designation is required'),
  leaveDate: Yup.date()
    .required('Leave date is required')
    .min(new Date(), 'Leave date cannot be in the past'),
  reason: Yup.string()
    .required('Reason is required')
    .min(3, 'Reason must be at least 3 characters'),
  document: Yup.mixed()
    // Document is optional
});

const AddLeaveModal = ({ onClose, onSubmit }) => {
  const initialValues = {
    employee: '',
    designation: '',
    leaveDate: '',
    reason: '',
    document: null
  };

  // List of employees for dropdown
  const employees = [
    { name: 'Jane Cooper', designation: 'Full Time Designer' },
    { name: 'Janney Wilson', designation: 'UI/UX Designer' },
    { name: 'Cody Fisher', designation: 'Senior Backend Developer' }
  ];

  // Calendar popup state
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState('');
  const [showEmployeeDropdown, setShowEmployeeDropdown] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Handle document upload
  const handleDocumentUpload = (setFieldValue) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      if (e.target.files?.length) {
        const file = e.target.files[0];
        setFieldValue('document', file);
      }
    };
    input.click();
  };

  // For filtering employees based on search
  const filteredEmployees = employees.filter(
    emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay">
      <div className="add-leave-modal">
        <div className="modal-header">
          <h2>Add New Leave</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={AddLeaveSchema}
          onSubmit={(values) => {
            // Format the leave data
            const formattedLeave = {
              name: values.employee,
              designation: values.designation,
              date: new Date(values.leaveDate).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit'
              }),
              reason: values.reason,
              status: 'Pending',
              docs: values.document !== null,
              profilePic: '/assets/profile-default.png' // Default profile pic
            };
            
            onSubmit(formattedLeave);
          }}
        >
          {({ setFieldValue, values, errors, touched, isValid, dirty }) => (
            <Form className="leave-form">
              <div className="form-group">
                <div className="employee-select">
                  <Field
                    type="text"
                    name="employee"
                    placeholder="Search Employee Name"
                    autoComplete="off"
                    onClick={() => setShowEmployeeDropdown(true)}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setFieldValue('employee', e.target.value);
                    }}
                    className={errors.employee && touched.employee ? 'error' : ''}
                  />
                  {showEmployeeDropdown && (
                    <div className="employee-dropdown">
                      {filteredEmployees.map((emp, index) => (
                        <div 
                          key={index} 
                          className="employee-option"
                          onClick={() => {
                            setFieldValue('employee', emp.name);
                            setFieldValue('designation', emp.designation);
                            setShowEmployeeDropdown(false);
                            setSearchTerm('');
                          }}
                        >
                          {emp.name}
                        </div>
                      ))}
                      {filteredEmployees.length === 0 && (
                        <div className="no-results">No employees found</div>
                      )}
                    </div>
                  )}
                  {values.employee && (
                    <button 
                      type="button" 
                      className="clear-input"
                      onClick={() => {
                        setFieldValue('employee', '');
                        setFieldValue('designation', '');
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <ErrorMessage name="employee" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <Field
                  type="text"
                  name="designation"
                  placeholder="Designation*"
                  disabled
                  className={errors.designation && touched.designation ? 'error' : ''}
                />
                <ErrorMessage name="designation" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <div className="date-input">
                  <Field
                    type="text"
                    name="leaveDate"
                    placeholder="Leave Date*"
                    readOnly
                    onClick={() => setShowCalendar(true)}
                    value={selectedDate}
                    className={errors.leaveDate && touched.leaveDate ? 'error' : ''}
                  />
                  <button 
                    type="button" 
                    className="calendar-btn"
                    onClick={() => setShowCalendar(true)}
                  >
                    <Calendar size={16} />
                  </button>
                </div>
                {showCalendar && (
                  <div className="calendar-popup">
                    <div className="calendar-header">
                      <button type="button" className="prev-month">&lt;</button>
                      <h4>September, 2024</h4>
                      <button type="button" className="next-month">&gt;</button>
                    </div>
                    <div className="calendar-grid">
                      <div className="calendar-day-header">Sun</div>
                      <div className="calendar-day-header">Mon</div>
                      <div className="calendar-day-header">Tue</div>
                      <div className="calendar-day-header">Wed</div>
                      <div className="calendar-day-header">Thu</div>
                      <div className="calendar-day-header">Fri</div>
                      <div className="calendar-day-header">Sat</div>
                      
                      {/* Example calendar days */}
                      {Array.from({ length: 30 }, (_, i) => {
                        const day = i + 1;
                        return (
                          <div
                            key={day}
                            className={`calendar-day ${day === 10 ? 'selected' : ''}`}
                            onClick={() => {
                              const date = new Date(2024, 8, day); // September (8) 2024
                              setSelectedDate(date.toLocaleDateString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: '2-digit'
                              }));
                              setFieldValue('leaveDate', date);
                              setShowCalendar(false);
                            }}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <ErrorMessage name="leaveDate" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <div className="document-upload">
                  <button
                    type="button"
                    className="upload-btn"
                    onClick={() => handleDocumentUpload(setFieldValue)}
                  >
                    Documents
                    <Upload size={16} className="upload-icon" />
                  </button>
                  {values.document && (
                    <div className="document-preview">
                      <span>{values.document.name}</span>
                      <button
                        type="button"
                        onClick={() => setFieldValue('document', null)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <Field
                  as="textarea"
                  name="reason"
                  placeholder="Reason*"
                  className={errors.reason && touched.reason ? 'error' : ''}
                />
                <ErrorMessage name="reason" component="div" className="error-message" />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="save-btn"
                  disabled={!isValid || !dirty}
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddLeaveModal;