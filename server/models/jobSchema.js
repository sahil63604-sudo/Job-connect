const mongoose = require('mongoose');
const jobSchema = mongoose.Schema(
    {

        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        salary: {
            type: Number,

        },
        jobType: {
            type: String,

            enum: ["Full-time", "Part-time", "Internship", "Contract"]
        },

        skills: {
            type: [String],
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'userschemas',
            required:true,
        }

    }
);

module.exports = mongoose.model('jobSchemas', jobSchema)