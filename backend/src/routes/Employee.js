const express = require("express")
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  createEmployeeAccount,
  downloadResume,
} = require("../controller/Employee")

const { protect, authorize } = require("../middleware/Auth")
const { uploadProfileImage, uploadResume } = require("../middleware/Upload")

const router = express.Router()

router.use(protect)

router.route("/employee").get(getEmployees).post(authorize("HR"), uploadProfileImage, uploadResume, createEmployee)

router
  .route("/employee/:id")
  .get(getEmployee)
  .put(authorize("HR"), uploadProfileImage, uploadResume, updateEmployee)
  .delete(authorize("HR"), deleteEmployee)

router.post("/createEmployee", authorize("HR"), createEmployeeAccount)
router.get("/downloadResume/:id", downloadResume)

module.exports = router
