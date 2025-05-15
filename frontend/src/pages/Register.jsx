// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../styles/Auth.css';

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords don't match");
//       return;
//     }
    
//     // In a real app, you would validate and send to server
//     console.log('Registration submitted:', formData);
//     // Simulate successful registration
//     navigate('/login');
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-logo">
//         <div className="logo">LOGO</div>
//       </div>
      
//       <div className="auth-content">
//         <div className="auth-left">
//           <div className="dashboard-preview">
//             <img src="/assets/images/dashboard-preview.jpg" alt="Dashboard Preview" />
//           </div>
//           <div className="preview-text">
//             <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h2>
//             <p>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//           </div>
//           <div className="slider-dots">
//             <span className="dot active"></span>
//             <span className="dot"></span>
//             <span className="dot"></span>
//           </div>
//         </div>
        
//         <div className="auth-right">
//           <div className="auth-form-container">
//             <h1>Welcome to Dashboard</h1>
            
//             <form onSubmit={handleSubmit} className="auth-form">
//               <div className="form-group">
//                 <label>Full name<span className="required">*</span></label>
//                 <input 
//                   type="text" 
//                   name="fullName" 
//                   value={formData.fullName} 
//                   onChange={handleChange} 
//                   placeholder="Full name" 
//                   required 
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>Email Address<span className="required">*</span></label>
//                 <input 
//                   type="email" 
//                   name="email" 
//                   value={formData.email} 
//                   onChange={handleChange} 
//                   placeholder="Email Address" 
//                   required 
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>Password<span className="required">*</span></label>
//                 <div className="password-input">
//                   <input 
//                     type={showPassword ? "text" : "password"} 
//                     name="password" 
//                     value={formData.password} 
//                     onChange={handleChange} 
//                     placeholder="Password" 
//                     required 
//                   />
//                   <button 
//                     type="button" 
//                     className="toggle-password" 
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
//                         <line x1="1" y1="1" x2="23" y2="23"></line>
//                       </svg>
//                     ) : (
//                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                         <circle cx="12" cy="12" r="3"></circle>
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Confirm Password<span className="required">*</span></label>
//                 <div className="password-input">
//                   <input 
//                     type={showConfirmPassword ? "text" : "password"} 
//                     name="confirmPassword" 
//                     value={formData.confirmPassword} 
//                     onChange={handleChange} 
//                     placeholder="Confirm Password" 
//                     required 
//                   />
//                   <button 
//                     type="button" 
//                     className="toggle-password" 
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? (
//                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
//                         <line x1="1" y1="1" x2="23" y2="23"></line>
//                       </svg>
//                     ) : (
//                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                         <circle cx="12" cy="12" r="3"></circle>
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>
              
//               <button type="submit" className="register-btn">Register</button>
//             </form>
            
//             <div className="auth-footer">
//               <p>Already have an account? <Link to="/login">Login</Link></p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;













"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useAuth } from "../../src/context/AuthContext"
import dashboardImage from "../assets/UserLogin.png"
import "../styles/Auth.css"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  // Validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required").min(2, "Name must be at least 2 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const success = await register({
        name: values.fullName,
        email: values.email,
        password: values.password,
      })

      if (success) {
        navigate("/")
      }
    } catch (error) {
      setErrors({ submit: error.message || "Registration failed" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <div className="logo-box"></div>
        <span className="logo-text">LOGO</span>
      </div>

      <div className="auth-content">
        <div className="auth-left">
          <div className="dashboard-preview">
            <img src={dashboardImage || "/placeholder.svg"} alt="Dashboard Preview" />
          </div>

          <div className="left-content">
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h2>
            <p>
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <div className="dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="form-container">
            <h1>Welcome to Dashboard</h1>

            <Formik
              initialValues={{
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="fullName">
                      Full name<span className="required">*</span>
                    </label>
                    <Field type="text" id="fullName" name="fullName" placeholder="Full name" className="form-control" />
                    <ErrorMessage name="fullName" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address<span className="required">*</span>
                    </label>
                    <Field type="email" id="email" name="email" placeholder="Email Address" className="form-control" />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      Password<span className="required">*</span>
                    </label>
                    <div className="password-field">
                      <Field
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                      />
                      <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      Confirm Password<span className="required">*</span>
                    </label>
                    <div className="password-field">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="form-control"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                  </div>

                  {errors.submit && <div className="error-message">{errors.submit}</div>}

                  <button type="submit" className="auth-button" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>

                  <div className="auth-redirect">
                    Already have an account? <Link to="/login">Login</Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
