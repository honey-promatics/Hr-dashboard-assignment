const path = require('path');
const ErrorResponse = require('../utils/errorResponse');

// Upload profile image
exports.uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.files || !req.files.profileImage) {
      return next();
    }

    const file = req.files.profileImage;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse('Please upload an image file', 400));
    }

    // Check file size
    if (file.size > 1000000) {
      return next(new ErrorResponse('Please upload an image less than 1MB', 400));
    }

    // Create custom filename
    file.name = `profile_${req.user.id}${path.parse(file.name).ext}`;

    // Move file to upload directory
    file.mv(`./uploads/profiles/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse('Problem with file upload', 500));
      }

      req.body.profileImage = file.name;
      next();
    });
  } catch (error) {
    next(error);
  }
};

// Upload resume
exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.files || !req.files.resume) {
      return next();
    }

    const file = req.files.resume;

    // Make sure the file is a PDF
    if (!file.mimetype.startsWith('application/pdf')) {
      return next(new ErrorResponse('Please upload a PDF file', 400));
    }

    // Check file size
    if (file.size > 2000000) {
      return next(new ErrorResponse('Please upload a file less than 2MB', 400));
    }

    // Create custom filename
    file.name = `resume_${Date.now()}${path.parse(file.name).ext}`;

    // Move file to upload directory
    file.mv(`./uploads/resumes/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse('Problem with file upload', 500));
      }

      req.body.resume = file.name;
      next();
    });
  } catch (error) {
    next(error);
  }
};

// Upload leave document
exports.uploadLeaveDocument = async (req, res, next) => {
  try {
    if (!req.files || !req.files.document) {
      return next();
    }

    const file = req.files.document;

    // Make sure the file is a PDF
    if (!file.mimetype.startsWith('application/pdf')) {
      return next(new ErrorResponse('Please upload a PDF file', 400));
    }

    // Check file size
    if (file.size > 5000000) {
      return next(new ErrorResponse('Please upload a file less than 5MB', 400));
    }

    // Create custom filename
    file.name = `leave_doc_${Date.now()}${path.parse(file.name).ext}`;

    // Move file to upload directory
    file.mv(`./uploads/documents/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse('Problem with file upload', 500));
      }

      req.body.document = file.name;
      next();
    });
  } catch (error) {
    next(error);
  }
};