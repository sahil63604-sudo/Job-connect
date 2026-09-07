const jobSchema = require('../models/jobSchema')
const RecruiterController = async (req, res) => {
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
    message:'job created',
    JobData
})

};
module.exports = RecruiterController