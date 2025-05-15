const path = require('path');
const ErrorResponse = require('../utils/errorResponse');

exports.uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.files || !req.files.profileImage) {
      return next();
    }

    const file = req.files.profileImage;

    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse('Please upload an image file', 400));
    }

    if (file.size > 1000000) {
      return next(new ErrorResponse('Please upload an image less than 1MB', 400));
    }

    file.name = `profile_${req.user.id}${path.parse(file.name).ext}`;

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

exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.files || !req.files.resume) {
      return next();
    }

    const file = req.files.resume;

    if (!file.mimetype.startsWith('application/pdf')) {
      return next(new ErrorResponse('Please upload a PDF file', 400));
    }

    if (file.size > 2000000) {
      return next(new ErrorResponse('Please upload a file less than 2MB', 400));
    }

    file.name = `resume_${Date.now()}${path.parse(file.name).ext}`;

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

exports.uploadLeaveDocument = async (req, res, next) => {
  try {
    if (!req.files || !req.files.document) {
      return next();
    }

    const file = req.files.document;

    if (!file.mimetype.startsWith('application/pdf')) {
      return next(new ErrorResponse('Please upload a PDF file', 400));
    }

    if (file.size > 5000000) {
      return next(new ErrorResponse('Please upload a file less than 5MB', 400));
    }

    file.name = `leave_doc_${Date.now()}${path.parse(file.name).ext}`;

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