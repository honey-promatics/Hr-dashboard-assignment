// import React, { useEffect, useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { X, Calendar, Upload } from 'react-feather';
// import { toast } from 'react-toastify';
// import { httpRequest } from '../../utils/httpRequest';
// import { DatePicker } from 'rsuite';
// import 'rsuite/dist/rsuite.min.css';

// // Validation schema using Yup
// const AddLeaveSchema = Yup.object().shape({
//   employee: Yup.string()
//     .required('Employee is required'),
//   designation: Yup.string()
//     .required('Designation is required'),
//   leaveDate: Yup.date()
//     .required('Leave date is required')
//     .min(new Date(), 'Leave date cannot be in the past'),
//   reason: Yup.string()
//     .required('Reason is required')
//     .min(3, 'Reason must be at least 3 characters'),
//   document: Yup.mixed()
//   // Document is optional
// });

// const AddLeaveModal = ({ onClose, onSuccess }) => {
//   const initialValues = {
//     employee: '',
//     designation: '',
//     leaveDate: '',
//     reason: '',
//     document: null
//   };

//   const [employeeList, setemployeeList] = useState([])

//   // Calendar popup state
//   const [showCalendar, setShowCalendar] = React.useState(false);
//   const [selectedDate, setSelectedDate] = React.useState('');
//   const [showEmployeeDropdown, setShowEmployeeDropdown] = React.useState(false);
//   const [searchTerm, setSearchTerm] = React.useState('');

//   // Handle document upload
//   const handleDocumentUpload = (setFieldValue) => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = '.pdf,.doc,.docx';
//     input.onchange = (e) => {
//       if (e.target.files?.length) {
//         const file = e.target.files[0];
//         setFieldValue('document', file);
//       }
//     };
//     input.click();
//   };

//   // const filteredEmployees = employeeList.filter(
//   //   emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase())
//   // );
//   const fetchCandidate = async () => {
//     try {
//       const response = await httpRequest(
//         `api/employees/getEmployees`,
//         "get",
//         {},
//         {},
//         true,
//         false
//       );
//       console.log("response : ", response)

//       if (response.success) {
//         setemployeeList(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   const handleAddLeave = async (values) => {
//     try {
//       console.log("values : ", values);
//       const data = new FormData();
//       data.append('employee', values.employee);
//       data.append('date', values.leaveDate);
//       data.append('reason', values.reason);
//       data.append('document', values.document);
//       console.log("data : ", data)

//       const response = await httpRequest(
//         `api/leaves/createLeave`,
//         "post",
//         data,
//         {},
//         true,
//         true
//       );
//       console.log("response : ", response)

//       if (response.success) {
//         toast.success("leave added successfully")
//       }
//       onSuccess()
//       onClose()
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchCandidate();
//   }, []);
//   return (
//     <div className="modal-overlay">
//       <div className="add-leave-modal">
//         <div className="modal-header">
//           <h2>Add New Leave</h2>
//           <button className="close-btn" onClick={onClose}>
//             <X size={20} />
//           </button>
//         </div>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={AddLeaveSchema}
//           onSubmit={handleAddLeave}
//         >
//           {({ setFieldValue, values, errors, touched, isValid, dirty }) => (
//             <Form className="leave-form">
//               <div className="form-group">
//                 <div className="employee-select">
//                   <Field
//                     type="text"
//                     name="employee"
//                     placeholder="Search Employee Name"
//                     autoComplete="off"
//                     onClick={() => setShowEmployeeDropdown(true)}
//                     onChange={(e) => {
//                       setSearchTerm(e.target.value);
//                       setFieldValue('employee', e.target.value);
//                     }}
//                     className={errors.employee && touched.employee ? 'error' : ''}
//                   />
//                   {showEmployeeDropdown && (
//                     <div className="employee-dropdown">
//                       {employeeList.map((emp, index) => (
//                         <div
//                           key={index}
//                           className="employee-option"
//                           onClick={() => {
//                             setFieldValue('employee', emp.fullName);
//                             setFieldValue('designation', emp.position);
//                             setShowEmployeeDropdown(false);
//                             setSearchTerm('');
//                           }}
//                         >
//                           {emp.fullName}
//                         </div>
//                       ))}
//                       {employeeList.length === 0 && (
//                         <div className="no-results">No employees found</div>
//                       )}
//                     </div>
//                   )}
//                   {values.employee && (
//                     <button
//                       type="button"
//                       className="clear-input"
//                       onClick={() => {
//                         setFieldValue('employee', '');
//                         setFieldValue('designation', '');
//                       }}
//                     >
//                       <X size={16} />
//                     </button>
//                   )}
//                 </div>
//                 <ErrorMessage name="employee" component="div" className="error-message" />
//               </div>

//               <div className="form-group">
//                 <Field
//                   type="text"
//                   name="designation"
//                   placeholder="Designation*"
//                   disabled
//                   className={errors.designation && touched.designation ? 'error' : ''}
//                 />
//                 <ErrorMessage name="designation" component="div" className="error-message" />
//               </div>
//               <div className="form-group">
//                 <DatePicker
//                   oneTap
//                   placeholder="Select Leave Date"
//                   value={values.leaveDate}
//                   onChange={(date) => {
//                     setFieldValue('leaveDate', date);
//                   }}
//                   shouldDisableDate={(date) => {
//                     // Disable past dates
//                     const today = new Date();
//                     today.setHours(0, 0, 0, 0);
//                     return date < today;
//                   }}
//                   style={{
//                     width: '100%',
//                     border: errors.leaveDate && touched.leaveDate
//                       ? '1px solid red'
//                       : '1px solid #ddd'
//                   }}
//                   format="yyyy-MM-dd"
//                   cleanable={false}
//                 />
//                 <ErrorMessage name="leaveDate" component="div" className="error-message" />
//               </div>

//               <div className="form-group">
//                 <div className="document-upload">
//                   <button
//                     type="button"
//                     className="upload-btn"
//                     onClick={() => handleDocumentUpload(setFieldValue)}
//                   >
//                     Documents
//                     <Upload size={16} className="upload-icon" />
//                   </button>
//                   {values.document && (
//                     <div className="document-preview">
//                       <span>{values.document.name}</span>
//                       <button
//                         type="button"
//                         onClick={() => setFieldValue('document', null)}
//                       >
//                         <X size={16} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="form-group">
//                 <Field
//                   as="textarea"
//                   name="reason"
//                   placeholder="Reason*"
//                   className={errors.reason && touched.reason ? 'error' : ''}
//                 />
//                 <ErrorMessage name="reason" component="div" className="error-message" />
//               </div>

//               <div className="form-actions">
//                 <button
//                   type="submit"
//                   className="save-btn"
//                 // disabled={!isValid || !dirty}
//                 >
//                   Save
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default AddLeaveModal;





import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, Upload } from 'react-feather';
import { toast } from 'react-toastify';
import { httpRequest } from '../../utils/httpRequest';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Validation schema using Yup
const AddLeaveSchema = Yup.object().shape({
  employee: Yup.string().required('Employee is required'),
  designation: Yup.string().required('Designation is required'),
  leaveDate: Yup.date()
    .required('Leave date is required')
    .min(new Date(), 'Leave date cannot be in the past'),
  reason: Yup.string()
    .required('Reason is required')
    .min(3, 'Reason must be at least 3 characters'),
  document: Yup.mixed(),
});

const AddLeaveModal = ({ onClose, onSuccess }) => {
  const initialValues = {
    employee: '',
    designation: '',
    leaveDate: null,
    reason: '',
    document: null,
  };

  const [employeeList, setEmployeeList] = useState([]);
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDocumentUpload = (setFieldValue) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      if (e.target.files?.length) {
        setFieldValue('document', e.target.files[0]);
      }
    };
    input.click();
  };

  const fetchCandidate = async () => {
    try {
      const response = await httpRequest(
        `api/employees/getEmployees`,
        'get',
        {},
        {},
        true,
        false
      );

      if (response.success) {
        setEmployeeList(response.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load employees');
    }
  };

  const handleAddLeave = async (values) => {
    try {
      const data = new FormData();
      data.append('employee', values.employee);
      data.append('date', values.leaveDate);
      data.append('reason', values.reason);

      if (values.document) {
        data.append('document', values.document);
      }

      console.log("data : ", data);

      const response = await httpRequest(
        `api/leaves/createLeave`,
        'post',
        data,
        {},
        true,
        true
      );

      if (response.success) {
        toast.success('Leave added successfully');
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error adding leave:', error);
      toast.error('Failed to add leave');
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  const filteredEmployees = employeeList.filter((emp) =>
    emp.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
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
          onSubmit={handleAddLeave}
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
                            setFieldValue('employee', emp._id);
                            setFieldValue('designation', emp.position);
                            setShowEmployeeDropdown(false);
                            setSearchTerm('');
                          }}
                        >
                          {emp.fullName}
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
                <DatePicker
                  selected={values.leaveDate}
                  onChange={(date) => setFieldValue('leaveDate', date)}
                  minDate={new Date()}
                  placeholderText="Select Leave Date"
                  className={`date-picker-input ${errors.leaveDate && touched.leaveDate ? 'error' : ''}`}
                  dateFormat="yyyy-MM-dd"
                  isClearable
                />
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