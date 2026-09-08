
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
    message:'job created',
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
const deleteJob = async (req,res) => {
    const recruiterId=req.recruiterId;
    const jobId=req.params.Id;

    try {
      const deletejob =  await jobSchema.findOneAndDelete({createdBy:recruiterId,_id:jobId})
      if (deletejob===null) {
           return res.status(404).json({
              message: 'document not found or you are not the owner'
          })
      }
        res.json({
            message:'document deleted successfully'
        })
    }catch (error) {
        console.log(error);
        res.json({
            message: 'document not deleted'
        })
    }
}

module.exports = { getMyJobs, updateJob,deleteJob,CreateJob }