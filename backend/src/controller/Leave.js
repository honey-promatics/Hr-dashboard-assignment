const Leave = require('../models/Leave');
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');
const fs = require('fs');

// @desc    Get all leaves
// @route   GET /api/leaves
// @access  Private/HR
exports.getLeaves = async (req, res, next) => {
  try {
    const { status, employeeId, startDate, endDate } = req.query;
    
    let query = {};
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }
    
    // Filter by employee if provided
    if (employeeId) {
      query.employee = employeeId;
    }
    
    // Filter by date range if provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.date = { $lte: new Date(endDate) };
    }
    
    const leaves = await Leave.find(query)
      .populate({
        path: 'employee',
        select: 'fullName position profileImage'
      })
      .sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get approved leaves
// @route   GET /api/leaves/approved
// @access  Private/HR
exports.getApprovedLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find({ status: 'Approved' })
      .populate({
        path: 'employee',
        select: 'fullName position profileImage'
      })
      .sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single leave
// @route   GET /api/leaves/:id
// @access  Private/HR
exports.getLeave = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.params.id)
      .populate({
        path: 'employee',
        select: 'fullName position profileImage'
      });
    
    if (!leave) {
      return next(new ErrorResponse(`Leave not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: leave
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new leave
// @route   POST /api/leaves
// @access  Private/HR
exports.createLeave = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;
    
    // Check if employee exists
    const employee = await Employee.findById(req.body.employee);
    if (!employee) {
      return next(new ErrorResponse('Employee not found', 404));
    }
    
    // Check if employee is present (has attendance record)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const attendance = await Attendance.findOne({
      employee: req.body.employee,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      },
      status: 'Present'
    });
    
    if (!attendance && req.user.role === 'Employee') {
      return next(new ErrorResponse('Only present employees can take leaves', 400));
    }
    
    const leave = await Leave.create(req.body);
    
    res.status(201).json({
      success: true,
      data: leave
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update leave status
// @route   PUT /api/leaves/:id/status
// @access  Private/HR
exports.updateLeaveStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    // Validate status
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return next(new ErrorResponse('Invalid status value', 400));
    }
    
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate({
      path: 'employee',
      select: 'fullName position profileImage'
    });
    
    if (!leave) {
      return next(new ErrorResponse(`Leave not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: leave
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete leave
// @route   DELETE /api/leaves/:id
// @access  Private/HR
exports.deleteLeave = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.params.id);
    
    if (!leave) {
      return next(new ErrorResponse(`Leave not found with id of ${req.params.id}`, 404));
    }
    
    // Check if user is leave creator or HR
    if (leave.createdBy.toString() !== req.user.id && req.user.role !== 'HR') {
      return next(new ErrorResponse('Not authorized to delete this leave', 401));
    }
    
    // Delete document file if exists
    if (leave.document) {
      const filePath = path.join(__dirname, '../uploads/documents', leave.document);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    await leave.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Download leave document
// @route   GET /api/leaves/:id/document
// @access  Private
exports.downloadLeaveDocument = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.params.id);
    
    if (!leave) {
      return next(new ErrorResponse(`Leave not found with id of ${req.params.id}`, 404));
    }
    
    if (!leave.document) {
      return next(new ErrorResponse('No document found for this leave', 404));
    }
    
    const filePath = path.join(__dirname, '../uploads/documents', leave.document);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return next(new ErrorResponse('Document file not found', 404));
    }
    
    res.download(filePath);
  } catch (error) {
    next(error);
  }
};