"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { X, Calendar } from "react-feather"

// Validation schema using Yup
const EditEmployeeSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required").min(3, "Name must be at least 3 characters"),
  email: Yup.string().email("Invalid email format").required("Email address is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^$$\d{3}$$ \d{3}-\d{4}$/, "Phone number must be in format (XXX) XXX-XXXX"),
  department: Yup.string().required("Department is required"),
  position: Yup.string().required("Position is required"),
  joinDate: Yup.string().required("Join date is required"),
})

const EditEmployeeModal = ({ employee, onClose, onSubmit }) => {
  const [showPositionDropdown, setShowPositionDropdown] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Check if employee is defined
  if (!employee) {
    console.error("Employee data is missing in EditEmployeeModal")
    return null
  }

  const initialValues = {
    fullName: employee.name || "",
    email: employee.email || "",
    phone: employee.phone || "",
    department: employee.department || "",
    position: employee.position || "",
    joinDate: employee.joinDate || "",
  }

  const positions = ["Intern", "Full Time", "Junior", "Senior", "Team Lead"]

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    if (!value) return value
    const phoneNumber = value.replace(/[^\d]/g, "")
    if (phoneNumber.length < 4) return phoneNumber
    if (phoneNumber.length < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  return (
    <div className="modal-overlay">
      <div className="edit-employee-modal">
        <div className="modal-header">
          <h2>Edit Employee Details</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={EditEmployeeSchema}
          onSubmit={(values) => {
            // Format the employee data
            const updatedEmployee = {
              ...employee,
              name: values.fullName,
              email: values.email,
              phone: values.phone,
              department: values.department,
              position: values.position,
              joinDate: values.joinDate,
            }

            onSubmit(updatedEmployee)
          }}
        >
          {({ setFieldValue, values, errors, touched, isValid, dirty }) => (
            <Form className="employee-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name*</label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={errors.fullName && touched.fullName ? "error" : ""}
                />
                <ErrorMessage name="fullName" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address*</label>
                <Field type="email" id="email" name="email" className={errors.email && touched.email ? "error" : ""} />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number*</label>
                <Field
                  name="phone"
                  render={({ field }) => (
                    <input
                      type="text"
                      id="phone"
                      {...field}
                      onChange={(e) => {
                        const formattedValue = formatPhoneNumber(e.target.value)
                        setFieldValue("phone", formattedValue)
                      }}
                      className={errors.phone && touched.phone ? "error" : ""}
                    />
                  )}
                />
                <ErrorMessage name="phone" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department*</label>
                <Field
                  type="text"
                  id="department"
                  name="department"
                  className={errors.department && touched.department ? "error" : ""}
                />
                <ErrorMessage name="department" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="position">Position*</label>
                <div className="position-select">
                  <Field
                    name="position"
                    render={({ field }) => (
                      <div className="custom-select">
                        <input
                          type="text"
                          id="position"
                          {...field}
                          readOnly
                          onClick={() => setShowPositionDropdown(!showPositionDropdown)}
                          className={errors.position && touched.position ? "error" : ""}
                        />
                        <span className="select-arrow" onClick={() => setShowPositionDropdown(!showPositionDropdown)}>
                          ▼
                        </span>
                        {showPositionDropdown && (
                          <div className="select-dropdown">
                            {positions.map((pos) => (
                              <div
                                key={pos}
                                className={`select-option ${values.position === pos ? "selected" : ""}`}
                                onClick={() => {
                                  setFieldValue("position", pos)
                                  setShowPositionDropdown(false)
                                }}
                              >
                                {pos}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  />
                  <ErrorMessage name="position" component="div" className="error-message" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="joinDate">Date of Joining*</label>
                <div className="date-input">
                  <Field
                    name="joinDate"
                    render={({ field }) => (
                      <input
                        type="text"
                        id="joinDate"
                        {...field}
                        readOnly
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className={errors.joinDate && touched.joinDate ? "error" : ""}
                      />
                    )}
                  />
                  <button type="button" className="calendar-btn" onClick={() => setShowDatePicker(!showDatePicker)}>
                    <Calendar size={16} />
                  </button>
                  {showDatePicker && (
                    <div className="date-picker">
                      <input
                        type="date"
                        onChange={(e) => {
                          // Format date as MM/DD/YY
                          const date = new Date(e.target.value)
                          const formattedDate = date.toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "2-digit",
                          })
                          setFieldValue("joinDate", formattedDate)
                          setShowDatePicker(false)
                        }}
                      />
                    </div>
                  )}
                </div>
                <ErrorMessage name="joinDate" component="div" className="error-message" />
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn" disabled={!isValid || !dirty}>
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default EditEmployeeModal
