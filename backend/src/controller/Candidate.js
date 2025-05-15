const Candidate = require("../schema/Candidate")
const ErrorResponse = require("../utils/errorResponse")
const path = require("path")
const fs = require("fs")

exports.getCandidates = async (req, res, next) => {
    try {
        const { status, search } = req.query

        const query = {}

        if (status) {
            query.status = status
        }

        if (search) {
            query.$or = [{ fullName: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
        }

        const candidates = await Candidate.find(query).sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: candidates.length,
            data: candidates,
        })
    } catch (error) {
        next(error)
    }
}

exports.getCandidate = async (req, res, next) => {
    try {
        const candidate = await Candidate.findById(req.params.id)

        if (!candidate) {
            return next(new ErrorResponse(`Candidate not found with id of ${req.params.id}`, 404))
        }

        res.status(200).json({
            success: true,
            data: candidate,
        })
    } catch (error) {
        next(error)
    }
}


exports.createCandidate = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.id

        const existingCandidate = await Candidate.findOne({ email: req.body.email })
        if (existingCandidate) {
            return next(new ErrorResponse("Candidate with this email already exists", 400))
        }

        const candidate = await Candidate.create(req.body)

        res.status(201).json({
            success: true,
            data: candidate,
        })
    } catch (error) {
        next(error)
    }
}

exports.updateCandidate = async (req, res, next) => {
    try {
        let candidate = await Candidate.findById(req.params.id)

        if (!candidate) {
            return next(new ErrorResponse(`Candidate not found with id of ${req.params.id}`, 404))
        }

        if (candidate.createdBy.toString() !== req.user.id && req.user.role !== "HR") {
            return next(new ErrorResponse("Not authorized to update this candidate", 401))
        }

        candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            success: true,
            data: candidate,
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteCandidate = async (req, res, next) => {
    try {
        const candidate = await Candidate.findById(req.params.id)

        if (!candidate) {
            return next(new ErrorResponse(`Candidate not found with id of ${req.params.id}`, 404))
        }

        if (candidate.createdBy.toString() !== req.user.id && req.user.role !== "HR") {
            return next(new ErrorResponse("Not authorized to delete this candidate", 401))
        }

        if (candidate.resume) {
            const filePath = path.join(__dirname, "../uploads/resumes", candidate.resume)
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
        }

        await candidate.deleteOne()

        res.status(200).json({
            success: true,
            data: {},
        })
    } catch (error) {
        next(error)
    }
}

exports.updateCandidateStatus = async (req, res, next) => {
    try {
        const { status } = req.body

        if (!["New", "Selected", "Rejected"].includes(status)) {
            return next(new ErrorResponse("Invalid status value", 400))
        }

        let candidate = await Candidate.findById(req.params.id)

        if (!candidate) {
            return next(new ErrorResponse(`Candidate not found with id of ${req.params.id}`, 404))
        }

        if (req.user.role !== "HR") {
            return next(new ErrorResponse("Not authorized to update candidate status", 401))
        }

        candidate = await Candidate.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true })

        res.status(200).json({
            success: true,
            data: candidate,
        })
    } catch (error) {
        next(error)
    }
}

exports.downloadResume = async (req, res, next) => {
    try {
        const candidate = await Candidate.findById(req.params.id)

        if (!candidate) {
            return next(new ErrorResponse(`Candidate not found with id of ${req.params.id}`, 404))
        }

        if (!candidate.resume) {
            return next(new ErrorResponse("No resume found for this candidate", 404))
        }

        const filePath = path.join(__dirname, "../uploads/resumes", candidate.resume)

        if (!fs.existsSync(filePath)) {
            return next(new ErrorResponse("Resume file not found", 404))
        }

        res.download(filePath)
    } catch (error) {
        next(error)
    }
}
