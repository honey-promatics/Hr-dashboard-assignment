const express = require("express")
const {
    getCandidates,
    getCandidate,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    updateCandidateStatus,
    downloadResume,
} = require("../controller/Candidate")

const { protect, authorize } = require("../middleware/Auth")
const { uploadResume } = require("../middleware/Upload")

const router = express.Router()

router.use(protect)

router.route("/candidates").get(getCandidates)

router.route('/createCandidate').post(authorize("HR"), createCandidate)

router.route("/candidate/:id").get(getCandidate).put(uploadResume, updateCandidate).delete(deleteCandidate)

router.put("/updateCandidate/:id", authorize("HR"), updateCandidateStatus)
router.get("/downloadResume/:id", downloadResume)

module.exports = router
