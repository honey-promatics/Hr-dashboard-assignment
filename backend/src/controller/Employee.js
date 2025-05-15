const Employee = require("../schema/Employee")
const Candidate = require("../schema/Candidate")
const User = require("../schema/User")
const ErrorResponse = require("../utils/errorResponse")
const path = require("path")
const fs = require("fs")

exports.getEmployees = async (req, res, next) => {
  try {
    const { status, department, search } = req.query

    const query = {}

    if (status) {
      query.status = status
    }

    if (department) {
      query.department = department
    }

    if (search) {
      query.$or = [{ fullName: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
    }

    const employees = await Employee.find(query).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    })
  } catch (error) {
    next(error)
  }
}

exports.getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)

    if (!employee) {
      return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({
      success: true,
      data: employee,
    })
  } catch (error) {
    next(error)
  }
}

exports.createEmployee = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id

    const existingEmployee = await Employee.findOne({ email: req.body.email })
    if (existingEmployee) {
      return next(new ErrorResponse("Employee with this email already exists", 400))
    }

    if (req.body.candidateId) {
      const candidate = await Candidate.findById(req.body.candidateId)
      if (!candidate) {
        return next(new ErrorResponse("Candidate not found", 404))
      }

      await Candidate.findByIdAndUpdate(req.body.candidateId, { status: "Selected" })
    }

    const employee = await Employee.create(req.body)

    res.status(201).json({
      success: true,
      data: employee,
    })
  } catch (error) {
    next(error)
  }
}

exports.updateEmployee = async (req, res, next) => {
  try {
    let employee = await Employee.findById(req.params.id)

    if (!employee) {
      return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404))
    }

    if (req.user.role !== "HR") {
      return next(new ErrorResponse("Not authorized to update employee details", 401))
    }

    employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      data: employee,
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)

    if (!employee) {
      return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404))
    }

    if (req.user.role !== "HR") {
      return next(new ErrorResponse("Not authorized to delete employee", 401))
    }

    if (employee.profileImage && employee.profileImage !== "default-profile.jpg") {
      const filePath = path.join(__dirname, "../uploads/profiles", employee.profileImage)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    if (employee.resume) {
      const filePath = path.join(__dirname, "../uploads/resumes", employee.resume)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    if (employee.user) {
      await User.findByIdAndUpdate(employee.user, { status: "Inactive" })
    }

    await employee.deleteOne()

    res.status(200).json({
      success: true,
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

exports.createEmployeeAccount = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)

    if (!employee) {
      return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404))
    }

    if (employee.user) {
      return next(new ErrorResponse("Employee already has a user account", 400))
    }

    const existingUser = await User.findOne({ email: employee.email })
    if (existingUser) {
      return next(new ErrorResponse("User with this email already exists", 400))
    }

    const user = await User.create({
      name: employee.fullName,
      email: employee.email,
      password: req.body.password || "password123", 
      role: employee.role === "HR" ? "HR" : "Employee",
      profileImage: employee.profileImage,
    })

    await Employee.findByIdAndUpdate(req.params.id, { user: user._id })

    res.status(201).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

exports.downloadResume = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)

    if (!employee) {
      return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404))
    }

    if (!employee.resume) {
      return next(new ErrorResponse("No resume found for this employee", 404))
    }

    const filePath = path.join(__dirname, "../uploads/resumes", employee.resume)

    if (!fs.existsSync(filePath)) {
      return next(new ErrorResponse("Resume file not found", 404))
    }

    res.download(filePath)
  } catch (error) {
    next(error)
  }
}
