
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useAuth } from "../../src/context/AuthContext"
import dashboardImage from "../assets/UserLogin.png"
import "../styles/Auth.css"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  })

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const success = await login(values.email, values.password)
      if (success) {
        navigate("/")
      }
    } catch (error) {
      setErrors({ submit: error.message || "Login failed" })
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
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors }) => (
                <Form>
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

                  <div className="form-group forgot-password">
                    <Link to="/forgot-password">Forgot password?</Link>
                  </div>

                  {errors.submit && <div className="error-message">{errors.submit}</div>}

                  <button type="submit" className="auth-button" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>

                  <div className="auth-redirect">
                    Don't have an account? <Link to="/register">Register</Link>
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

export default Login
