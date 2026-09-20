import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
function EditJob() {
    const {jobId}=useParams()
    
     const [formData, setFormData] = useState({
        title: "",
        company: "",
        description: "",
        location: "",
        salary: "",
        jobType: "",
        skills: ""
    })
    useEffect(()=>{
        async function getJob() {
            let token= localStorage.getItem('token')
let response = await axios.get(`http://localhost:5000/api/job/recruiterJob/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })   
             const job = response.data.job

        setFormData({
            title: job.title,
            company: job.company,
            description: job.description,
            location: job.location,
            salary: job.salary,
            jobType: job.jobType,
            skills: job.skills.join(', ')
        })
        }
        getJob();
    },[]) 
   
    function handelChanges(e) {

        const { name, value } = e.target;
        setFormData((form) => ({ ...form, [name]: value }))

    }
    async function submitForm(e) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        let data = {
            ...formData,
            skills: formData.skills.split(',').map(skill => skill.trim())
        }
        let response = await axios.put(
            `http://localhost:5000/api/job/updateJob/${jobId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }
    return (
        <>
            <div>Edit Job</div>
            <form action="" onSubmit={(e) => submitForm(e)}>
                <label htmlFor="title">Title</label>
                <input onChange={handelChanges}
                value={formData.title}
                    type="text"
                    id="title"
                    name='title'
                    placeholder="Enter title here"
                />

                <label htmlFor="company">Company</label>
                <input onChange={handelChanges}
                value={formData.company}
                    type="text"
                    name="company"
                    placeholder="Enter company name here"
                />

                <label htmlFor="description">Description</label>
                <input onChange={handelChanges}
                value={formData.description}
                    type="text"
                    name="description"
                    placeholder="Enter description here"
                />

                <label htmlFor="location">Location</label>
                <input onChange={handelChanges}
                value={formData.location}
                    type="text"
                    name="location"
                    placeholder="Enter job location"
                />

                <label htmlFor="salary">Salary</label>
                <input onChange={handelChanges}
                value={formData.salary}
                    type="number"
                    name="salary"
                    placeholder="Enter salary"
                />

                <label htmlFor="jobType">Job Type</label>
                <select onChange={handelChanges} name="jobType" value={formData.jobType}>
                    <option value="">Select job type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                </select>

                <label htmlFor="skills">Skills</label>
                <input onChange={handelChanges}
                value={formData.skills}
                    type="text"
                    name="skills"
                    placeholder="Enter skills (React, Node.js, MongoDB)"
                />

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default EditJob