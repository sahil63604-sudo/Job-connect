
const { default: mongoose } = require("mongoose");
const jobSchema = require("../models/jobSchema");

const CreateJob = async (req, res) => {
    const recruiterId = req.recruiterId
    console.log(recruiterId);

    const { title, company, description, location, salary, jobType, skills } = req.body;

    if (!title || !company || !description || !location || !salary || !jobType || !skills) {
        return res.status(400).json({
            message: "all fields are required"
        })
    }
    const JobData = await jobSchema.create({
        title,
        company,
        description,
        location,
        salary,
        jobType,
        skills,
        createdBy: recruiterId
    })
    res.status(201).json({
        message: 'job created',
        JobData
    })

};

const getMyJobs = async (req, res) => {
    try {


        const recruiterId = req.recruiterId

        const myJobs = await jobSchema.find({ createdBy: recruiterId })

        res.json({
            message: 'jobs fetched successfully',
            myJobs
        })
    } catch (error) {
        console.error(error)
        return res.json({
            message: 'server error'
        })
    }
}
const updateJob = async (req, res) => {
    const recruiterId = req.recruiterId;
    const jobId = req.params.Id;
    const { title, company, description, location, salary, jobType, skills } = req.body;

    try {
        const update = await jobSchema.findOneAndUpdate({
            _id: jobId,
            createdBy: recruiterId
        }, {
            title: title,
            company: company,
            description: description,
            location: location,
            salary: salary,
            jobType: jobType,
            skills: skills
        },
            { new: true }
        )
        if (update === null) {
            return res.status(404).json({
                message: 'document not found or you are not the owner'
            })
        }
        res.json({
            message: 'document updated',
            update
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: 'document not updated'
        })
    }

}
const deleteJob = async (req, res) => {
    const recruiterId = req.recruiterId;
    const jobId = req.params.Id;

    try {
        const deletejob = await jobSchema.findOneAndDelete({ createdBy: recruiterId, _id: jobId })
        if (deletejob === null) {
            return res.status(404).json({
                message: 'document not found or you are not the owner'
            })
        }
        res.json({
            message: 'document deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: 'document not deleted'
        })
    }
}
const searchJobs = async (req, res) => {
    const { search, location, minSalary, maxSalary, jobType, sortby, page } = req.query;
    const limit = 10;
    const CurrentPage = Number(page) || 1;
    const skip = (CurrentPage - 1) * limit;
    try {
        let query = {}

        if (search) {

            query = {
                $or: [
                    {

                        title: {

                            $regex: search,
                            $options: 'i'
                        }
                    }, {
                        company: {
                            $regex: search,
                            $options: 'i'
                        }
                    }, {
                        location: {
                            $regex: search,
                            $options: 'i'
                        }
                    }, {
                        skills: {
                            $regex: search,
                            $options: 'i'
                        }
                    }

                ]


            }
        }
        if (location) {
            query.location = {
                $regex: location,
                $options: 'i'
            }
        }
        if (jobType) {
            query.jobType = jobType
        }
        if (minSalary && maxSalary) {
            query.salary = {
                $gte: Number(minSalary),
                $lte: Number(maxSalary)
            };
        }
        else if (minSalary) {
            query.salary = { $gte: Number(minSalary) };
        }
        else if (maxSalary) {
            query.salary = { $lte: Number(maxSalary) };
        }
        let sort = { createdAt: -1 }
        if (sortby === 'salaryHigh') {
            sort = { salary: -1 }
        } else if (sortby === 'salaryLow') {
            sort = { salary: 1 }
        }
        const totalJobs = await jobSchema.countDocuments(query);

        const jobs = await jobSchema
            .find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "job not found with given keywords try using different keywords"
            });
        }

        res.json({
            jobs,
            pagination: {
                currentPage: CurrentPage,
                limit,
                totalJobs,
                totalPages: Math.ceil(totalJobs / limit)
            }
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "failed to fetch jobs"
        });
    }

}

const getjobdetails = async (req, res) => {
    const { jobId } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.json({
                message: 'not a valid object Id'
            })
        }
        const job = await jobSchema.findOne({ _id: jobId }).populate('createdBy', 'name email createdAt');
        if (!job) {
            return res.status(404).json({
                message: "job not found"
            })
        }
        res.status(200).json({
            job
        })
    } catch (error) {
        console.log(error);

    }


}
module.exports = { getMyJobs, updateJob, deleteJob, CreateJob, searchJobs, getjobdetails }