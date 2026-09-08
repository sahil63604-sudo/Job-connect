const { default: mongoose } = require("mongoose");
const applicantionSchema = require("../models/applicantionSchema");
const jobSchema = require("../models/jobSchema");
const userSchema = require("../models/userSchema");
const applyController = async (req, res) => {
    const jobseekerId = req.jobseekerId
    const jobId = req.params.jobId;

    try {
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: 'not a valid objectId'
            })
        }
        const isjobseeker = await userSchema.findOne({ _id: jobseekerId });
        const isjob = await jobSchema.findOne({ _id: jobId })
        const alreadyexist = await applicantionSchema.findOne({
            applicant: jobseekerId, job: jobId
        })
        if (!isjobseeker) {
            return res.status(404).json({
                message: 'user not found'
            })
        }
        if (!isjob) {
            return res.status(404).json({
                message: 'job not found'
            }
            )
        }
        if (alreadyexist) {
            return res.status(409).json({
                message: "this application already exists"
            })
        }
        const application = await applicantionSchema.create({
            applicant: jobseekerId,
            job: jobId
        })

        res.status(201).json({
            message: 'application submitted',

        })
    } catch (error) {
        console.error(error)
        res.json({
            message: 'server error',
            error
        })
    }
}

const getApplicants = async (req, res) => {
    const recruiterId = req.recruiterId;

    try {
        const applicants = await applicantionSchema.find().populate("job", {
            match: {
                createdBy: recruiterId
            }
        }).populate("applicant", "name email")


        const filteredApplicants = applicants.filter(application =>
            application.job !== null
        )



        res.json({
            filteredApplicants,

        })
    } catch (error) {
        console.log(error);
    }
}

const getApplications = async (req, res) => {
    const jobseekerId = req.jobseekerId;

    try {
        const applications = await applicantionSchema.find({ applicant: jobseekerId }).populate("job").populate("applicant", "name email")


        const filteredApplications = applications.filter(application =>
            application.job !== null
        )

        res.json({
            filteredApplications,

        })
    } catch (error) {
        console.log(error);
    }
}

const updateController = async (req, res) => {
    const applicationId = req.params.applicationId;
    const recruiterId = req.recruiterId;
    const { status } = req.body;
    try {
        console.log(status);

        const applications = await applicantionSchema.find({ _id: applicationId }).populate({
            path: "job",
            match: {
                createdBy: recruiterId
            }
        })
        if (!applications.length) {
            return res.status(404).json({ message: "application not found" });
        }

        if (applications[0].job === null) {
            return res.status(403).json({ message: "you are not the owner of this job" });
        }

        if (applications[0].job.createdBy.toString() !== recruiterId) {
            return res.status(403).json({
                message: 'you are not the owner of this job'
            })
        }
        const updated = await applicantionSchema.findOneAndUpdate({ _id: applicationId }, {
            status: status
        })
        res.json({
            message: 'document updated successfully',
            updated
        })
    } catch (error) {
        console.log(error);

    }
}
module.exports = { applyController, getApplicants, getApplications, updateController }