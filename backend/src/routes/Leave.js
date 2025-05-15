const express = require('express');
const {
  getLeaves,
  getApprovedLeaves,
  getLeave,
  createLeave,
  updateLeaveStatus,
  deleteLeave,
  downloadLeaveDocument
} = require('../controller/Leave');

const { protect, authorize } = require('../middleware/Auth');
const { uploadLeaveDocument } = require('../middleware/Upload');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getLeaves)
  .post(uploadLeaveDocument, createLeave);

router.get('/approved', getApprovedLeaves);

router.route('/:id')
  .get(getLeave)
  .delete(deleteLeave);

router.put('/:id/status', authorize('HR'), updateLeaveStatus);
router.get('/:id/document', downloadLeaveDocument);

module.exports = router;